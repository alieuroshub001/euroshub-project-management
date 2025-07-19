// src/models/auth/User.model.ts

import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Role, Status } from '../../types/common';

export interface IUser extends Document {
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
  twoFactorSecret?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    password: { type: String, select: false },
    phone: { 
      type: String, 
      trim: true,
      match: [/^\+[1-9]\d{1,14}$/, 'Invalid E.164 phone number']
    },
    role: {
      type: String,
      required: true,
      enum: ['super-admin', 'admin', 'manager', 'team', 'client'],
      default: 'team'
    },
    department: { type: String, trim: true },
    profilePicture: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending', 'archived'],
      default: 'pending'
    },
    lastActive: { type: Date },
    otpEnabled: { type: Boolean, default: false },
    lastOtpSentAt: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    otpLockUntil: { type: Date },
    isVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { sparse: true });
userSchema.index({ status: 1 });

// Password handling
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password!, 12);
  next();
});

export const User = model<IUser>('User', userSchema);