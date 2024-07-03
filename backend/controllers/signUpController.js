import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

let otpSecret = null;
let pendingUserData = null;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const signup = async (req, res) => {
  const { name, email, mobile, college, password } = req.body;
  pendingUserData = { name, email, mobile, college, password };
  otpSecret = speakeasy.generateSecret({ length: 6 }).base32;
  const otp = speakeasy.totp({
    secret: otpSecret,
    encoding: 'base32',
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent');
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send(error.toString());
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  
  const verified = speakeasy.totp.verify({
    secret: otpSecret,
    encoding: 'base32',
    token: otp,
    window: 1,
  });

  if (verified) {
    const userData = pendingUserData;
    try {
      const user = await User.create(userData);
      pendingUserData = null;
      res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  } else {
    res.status(400).send('Invalid OTP');
  }
};