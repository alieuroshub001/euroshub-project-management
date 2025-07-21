import crypto from 'crypto';
import { generateOTPToken, verifyToken } from './jwt';
import { sendEmail } from './email';

const OTP_EXPIRY_MINUTES = 5;
const OTP_LENGTH = 6;

export function generateOTP(length: number = OTP_LENGTH): string {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  
  return otp;
}

export async function sendAndStoreOTP(
  email: string, 
  type: 'signup' | 'reset' | '2fa' | 'login'
) {
  const otp = generateOTP();
  const token = generateOTPToken(email, type);
  
  // Send OTP via email
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
  });

  // In a real app, you would store the OTP hash in database with expiry
  // For demo, we'll just return the token
  return token;
}

export function verifyOTP(
  token: string, 
  expectedEmail: string, 
  expectedType: string
) {
  try {
    const decoded = verifyToken(token) as unknown as { email: string; type: string };
    return decoded.email === expectedEmail && decoded.type === expectedType;
  } catch (error) {
    return false;
  }
}