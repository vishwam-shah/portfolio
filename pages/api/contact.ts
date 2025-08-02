import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, contact, message } = req.body;

  if (!name || !email || !contact || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send professional email to site owner
    await transporter.sendMail({
      from: `Vishwam Shah Portfolio <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: 'New Contact Submission from Portfolio',
      text:
        `Hello Vishwam,\n\nYou have received a new contact submission from your portfolio website.\n\nDetails:\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}\n\nPlease respond promptly.`,
      html:
        `<div style="font-family:Arial,sans-serif;font-size:16px;color:#222;">
          <h2 style="color:#6366f1;">New Contact Submission</h2>
          <ul style="background:#f3f4f6;padding:16px;border-radius:8px;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Contact:</strong> ${contact}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p style="margin-top:24px;">Please respond promptly.</p>
        </div>`,
    });

    // Send professional confirmation email to user
    await transporter.sendMail({
      from: `Vishwam Shah Portfolio <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Vishwam Shah',
      text:
        `Dear ${name},\n\nThank you for reaching out to Vishwam Shah. Your message has been received and I appreciate your interest.\n\nHere is a summary of your submission:\n\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}\n\nI will review your message and get back to you as soon as possible.\n\nBest regards,\nVishwam Shah\nAI Developer | Portfolio Website`,
      html:
        `<div style="font-family:Arial,sans-serif;font-size:16px;color:#222;">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to <strong>Vishwam Shah</strong>. Your message has been received and I appreciate your interest.</p>
          <h3 style="color:#6366f1;">Submission Details</h3>
          <ul style="background:#f3f4f6;padding:16px;border-radius:8px;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Contact:</strong> ${contact}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>I will review your message and get back to you as soon as possible.</p>
          <p style="margin-top:24px;">Best regards,<br/><strong>Vishwam Shah</strong><br/>AI Developer | Portfolio Website</p>
        </div>`,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email', error });
  }
}
