import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { generateUserConfirmationEmail, generateAdminNotificationEmail } from '../utils/emailTemplates.js';
import connectDB from '../config/database.js'; // Ensure connection in serverless


// Submit contact form
export const submitContact = async (req, res) => {
  try {
    // Await DB connection explicitly for Vercel's serverless environment
    await connectDB();

    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create contact in database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent') || ''
    });

    // Send email to admin
    try {
      // Initialize nodemailer transporter inside the function
      // so we guarantee dotenv has loaded environment variables first
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const adminEmailHtml = generateAdminNotificationEmail(name, email, subject, message, new Date());

      const adminResult = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Portfolio Contact: ${subject}`,
        html: adminEmailHtml
      });
      console.log('Admin email sent:', adminResult.messageId);

      // Send confirmation email to user
      const userEmailHtml = generateUserConfirmationEmail(name, subject, message);

      const userResult = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        replyTo: process.env.EMAIL_USER,
        subject: 'We received your message',
        html: userEmailHtml
      });
      console.log('User confirmation email sent:', userResult.messageId);
      console.log('Sent to:', email);

    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
      // Continue even if email fails - contact is saved in database
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. I will get back to you soon!',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all contacts (Admin only)
export const getAllContacts = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single contact (Admin only)
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Mark as read
    contact.status = 'read';
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete contact (Admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
