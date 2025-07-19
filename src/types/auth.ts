import { Role } from './common';

export interface LoginRequest {
  email: string;
  password?: string;
  otp?: string; // For 2FA verification
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, 'super-admin'>;
  department?: string;
  inviteToken?: string;
  otp?: string; // For signup verification
}

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: Role;
  token: string;
  refreshToken?: string;
  profilePicture?: string;
  department?: string;
  permissions?: string[];
  isVerified?: boolean;
  twoFactorEnabled?: boolean;
  otpEnabled?: boolean;
  lastOtpSentAt?: Date;
}

export interface JwtPayload {
  email: string;
  role: Role;
  _id: string;
  iat: number;
  exp: number;
  permissions?: string[];
  sessionId?: string;
  otpVerified?: boolean; // Indicates if OTP was completed
}

export interface PasswordResetRequest {
  email: string;
  token: string;
  newPassword: string;
  otp?: string; // For OTP verification during reset
}

export interface EmailVerificationRequest {
  token: string;
  otp?: string; // For OTP verification
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface Session {
  _id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
  otpVerified?: boolean; // Session-level OTP verification
}

export interface OAuthProfile {
  provider: 'google' | 'github' | 'microsoft';
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface Invitation {
  email: string;
  role: Role;
  token: string;
  expiresAt: Date;
  invitedBy: string;
  createdAt: Date;
}

// NEW OTP-RELATED TYPES
export interface OTPRequest {
  email: string;
  type: 'signup' | 'reset' | '2fa' | 'login';
  channel?: 'email' | 'sms'; // Delivery channel
}

export interface OTPVerification {
  email: string;
  code: string;
  type: 'signup' | 'reset' | '2fa' | 'login';
  token?: string; // For password reset flows
}

export interface OTPStatus {
  valid: boolean;
  remainingAttempts?: number;
  retryAfter?: number; // Seconds
}