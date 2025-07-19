// src/models/auth/Session.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  userAgent?: string;
  ipAddress?: string;
  deviceInfo?: {
    os?: string;
    browser?: string;
    device?: string;
  };
  expiresAt: Date;
  otpVerified?: boolean;
  isValid: boolean;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    userAgent: { type: String },
    ipAddress: { type: String },
    deviceInfo: {
      os: { type: String },
      browser: { type: String },
      device: { type: String }
    },
    expiresAt: { type: Date, required: true },
    otpVerified: { type: Boolean, default: false },
    isValid: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Indexes
sessionSchema.index({ userId: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
sessionSchema.index({ isValid: 1 });

export const Session = model<ISession>('Session', sessionSchema);