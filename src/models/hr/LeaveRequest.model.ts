// src/models/hr/LeaveRequest.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ILeaveRequest extends Document {
  userId: Schema.Types.ObjectId;
  type: 'casual' | 'sick' | 'annual' | 'unpaid';
  reason: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: Schema.Types.ObjectId;
  approvedAt?: Date;
  rejectedBy?: Schema.Types.ObjectId;
  rejectedAt?: Date;
  rejectionReason?: string;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    type: {
      type: String,
      enum: ['casual', 'sick', 'annual', 'unpaid'],
      required: true
    },
    reason: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 1000 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    approvedAt: { type: Date },
    rejectedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    rejectedAt: { type: Date },
    rejectionReason: { 
      type: String, 
      trim: true,
      maxlength: 500 
    }
  },
  { timestamps: true }
);

// Indexes
leaveRequestSchema.index({ userId: 1 });
leaveRequestSchema.index({ startDate: 1, endDate: 1 });
leaveRequestSchema.index({ status: 1 });
leaveRequestSchema.index({ type: 1 });

export const LeaveRequest = model<ILeaveRequest>('LeaveRequest', leaveRequestSchema);