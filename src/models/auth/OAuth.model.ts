// src/models/auth/OAuth.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IOAuth extends Document {
  userId: Schema.Types.ObjectId;
  provider: 'google' | 'github' | 'microsoft';
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

const oauthSchema = new Schema<IOAuth>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    provider: {
      type: String,
      required: true,
      enum: ['google', 'github', 'microsoft']
    },
    providerId: { type: String, required: true },
    accessToken: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

// Compound unique index
oauthSchema.index({ userId: 1, provider: 1 }, { unique: true });
oauthSchema.index({ providerId: 1 });

export const OAuth = model<IOAuth>('OAuth', oauthSchema);