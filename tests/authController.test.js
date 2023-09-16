import chai from "chai";
import sinon from "sinon";
import app from "../index.js"; // Import your Express app
import User from "../models/UserModel.js"; // Import your User model
import Doctor from "../models/DoctorModel.js"; // Import your Doctor model
import { generateToken } from "../Utils/jsonToken.js";

const { expect } = chai;

// Import `request` as a function from `supertest`
import request from "supertest";

describe("Authentication Controller", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", (done) => {
      // Mock User or Doctor model methods
      const saveStub = sinon.stub();
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(Doctor, "findOne").resolves(null);

      // Stub the save method to resolve successfully
      saveStub.resolves({
        _id: "123",
        email: "test@example.com",
        name: "Test User",
      });
      sinon.stub(User.prototype, "save").returns(saveStub);

      request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
          role: "patient",
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.deep.equal({
            success: true,
            message: "User Successfully Created",
          });
          done();
        });
    });

    // Add more test cases, including negative cases for validation, etc.
  });

  // Write similar tests for the login function
});
