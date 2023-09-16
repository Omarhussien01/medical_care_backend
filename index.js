import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import prescriptionRouter from "./routes/prescriptionRouter.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/presciption", prescriptionRouter);

app.use(errorHandler);

app.listen(port, () => {
  connectDb();
  console.log(`Server is running on PORT:${port}... `);
});

export default app;