// src/models/time/Timesheet.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ITimesheet extends Document {
  userId: Schema.Types.ObjectId;
  weekStart: Date;
  weekEnd: Date;
  logs: Schema.Types.ObjectId[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalHours: number;
  submittedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}

const timesheetSchema = new Schema<ITimesheet>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    weekStart: { 
      type: Date, 
      required: true,
      index: true 
    },
    weekEnd: { 
      type: Date, 
      required: true,
      index: true 
    },
    logs: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'TimeLog' 
    }],
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'rejected'],
      default: 'draft'
    },
    totalHours: { 
      type: Number, 
      min: 0, 
      default: 0 
    },
    submittedAt: { type: Date },
    approvedAt: { type: Date },
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
timesheetSchema.index({ userId: 1 });
timesheetSchema.index({ weekStart: 1, weekEnd: 1 });
timesheetSchema.index({ status: 1 });

// Virtual for week number
timesheetSchema.virtual('weekNumber').get(function() {
  const date = new Date(this.weekStart);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
});

export const Timesheet = model<ITimesheet>('Timesheet', timesheetSchema);