// src/models/auth/Token.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  type: 'refresh' | 'reset' | 'verify' | 'otp';
  expiresAt: Date;
  blacklisted: boolean;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    token: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['refresh', 'reset', 'verify', 'otp']
    },
    expiresAt: { type: Date, required: true },
    blacklisted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Indexes
tokenSchema.index({ token: 1 }, { unique: true });
tokenSchema.index({ userId: 1, type: 1 });
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = model<IToken>('Token', tokenSchema);