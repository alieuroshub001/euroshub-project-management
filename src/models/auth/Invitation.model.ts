// src/models/auth/Invitation.model.ts

import { Schema, model, Document } from 'mongoose';
import { Role } from '../../types/common';

export interface IInvitation extends Document {
  email: string;
  role: Role;
  token: string;
  expiresAt: Date;
  invitedBy: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'expired';
}

const invitationSchema = new Schema<IInvitation>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    role: {
      type: String,
      required: true,
      enum: ['super-admin', 'admin', 'manager', 'team', 'client']
    },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    invitedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

// Indexes
invitationSchema.index({ token: 1 }, { unique: true });
invitationSchema.index({ email: 1, status: 1 });
invitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Invitation = model<IInvitation>('Invitation', invitationSchema);