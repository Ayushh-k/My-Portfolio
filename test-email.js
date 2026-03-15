import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function testEmail() {
  try {
    console.log('Testing email credentials...');
    console.log('User:', process.env.EMAIL_USER);
    // don't log password
    
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'This is a test email'
    });
    
    console.log('Email sent successfully:', result.messageId);
  } catch (error) {
    console.error('Email sending failed with error:');
    console.error(error);
  }
}

testEmail();
