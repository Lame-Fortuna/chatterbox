import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.mailID,
    pass: process.env.mailpwd,
  },
});

export function sendVerificationEmail(to, token) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Account Verification',
    text: `Click the following link to verify your account: http://localhost:9000/signup/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
