import User from "../models/User.js";
import argon2 from 'argon2'; // Import argon2 library
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'SPIRIT 2024- Campus Ambassador Registration Successful!',
    text: `Congratulations!
    
     We have received your registration for the Campus Ambassador program for SPIRIT, the annual sports festival of IIT Guwahati. We're thrilled to have you on board and look forward to working closely with you to promote our festival ,brand and engage with your campus community. As a Campus Ambassador, you'll play a vital role in representing SPIRIT on your campus, organizing events, and spreading the word about our mission and initiatives.Stay tuned for further communication regarding upcoming events, training sessions,tasks and exclusive opportunities reserved for you as ambassadors for SPIRIT.Once again, welcome to the team , and thank you for joining us on this exciting journey!

     Best regards,
     TEAM SPIRIT.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};


export const login= async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await argon2.verify(user.password, password); // Verify password using argon2
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.firstLogin) {
      await sendConfirmationEmail(user.email);
      user.firstLogin = false; 
      await user.save(); 
    }
    console.log("User exists");
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error });
  }
};
