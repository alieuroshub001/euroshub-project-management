import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET!;

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  sessionId?: string;
  otpVerified?: boolean;
}

interface OTPTokenPayload {
  email: string;
  type: string;
}

export function generateToken(payload: TokenPayload, expiresIn: SignOptions['expiresIn'] = '1h'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function generateRefreshToken(payload: TokenPayload, expiresIn: SignOptions['expiresIn'] = '7d'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function generateOTPToken(email: string, type: string, expiresIn: SignOptions['expiresIn'] = '5m'): string {
  const payload: OTPTokenPayload = { email, type };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}