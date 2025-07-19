import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// OTP Email Template
export async function sendOTPEmail(email: string, otp: string) {
  const subject = 'Your OTP Code';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Your One-Time Password (OTP)</h2>
      <p>Please use the following OTP to complete your verification:</p>
      <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="margin: 0; color: #2563eb; letter-spacing: 5px;">${otp}</h1>
      </div>
      <p>This OTP is valid for 5 minutes. Do not share this code with anyone.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}