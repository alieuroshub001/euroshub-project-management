// src/types/user.ts
import { Role, Status } from './common';

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: Role;
  department?: string;
  profilePicture?: string;
  status: Status;
  lastActive?: Date;
  otpEnabled: boolean;
  lastOtpSentAt?: Date;
  otpAttempts?: number;
  otpLockUntil?: Date;
  isVerified?: boolean;
  twoFactorEnabled?: boolean;
  verificationOTP?: string;
  verificationOTPExpires?: Date;
  verificationAttempts?: number;
  modifiedBy?: string;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'password'> {
  timezone?: string;
  bio?: string;
  skills?: string[];
}

export interface UserStats {
  completedTasks: number;
  overdueTasks: number;
  hoursLogged: number;
  projectsInvolved: number;
}