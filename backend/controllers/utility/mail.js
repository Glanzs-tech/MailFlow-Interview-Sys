import nodemailer from "nodemailer";
import config from "@/config";
import { EmailTemplate } from "@/models";
import isEmpty from "is-empty";
import moment from "moment";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS,
  },
});


export const sendMail = async ({mailOptions }) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (err) {
    console.error(" Failed to send email:", err);
    return false;
  }
};