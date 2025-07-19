import { Role, Status } from './common';

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string; // For SMS OTP
  role: Role;
  department?: string;
  profilePicture?: string;
  status: Status;
  lastActive?: Date;
  // OTP Fields
  otpEnabled: boolean;
  lastOtpSentAt?: Date;
  otpAttempts?: number;
  otpLockUntil?: Date;
  // Timestamps
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'password'> {
  timezone?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
}

export interface UserStats {
  completedTasks: number;
  overdueTasks: number;
  hoursLogged: number;
  projectsInvolved: number;
}