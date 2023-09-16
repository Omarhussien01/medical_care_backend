import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Create a transporter with your email service details
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service (e.g., Gmail, SMTP)
  auth: {
    user: process.env.GMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
  tls: {
    rejectUnauthorized: false, // Disable SSL certificate verification
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.GMAIL, // Sender's email address
      to, // Recipient's email address
      subject, // Subject line
      text, // Plain text body
    });

    console.log("Email sent:", subject);
  } catch (error) {
    console.error("Email error:", error);
  }
};
