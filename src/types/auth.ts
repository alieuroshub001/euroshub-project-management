// types/auth.ts

import { Role } from './common';

export interface LoginRequest {
  email: string;
  password?: string;
  otp?: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, 'super-admin'>;
  department?: string;
  inviteToken?: string;
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
}

export interface JwtPayload {
  email: string;
  role: Role;
  _id: string;
  iat: number;
  exp: number;
  permissions?: string[];
  sessionId?: string;
}

export interface PasswordResetRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
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