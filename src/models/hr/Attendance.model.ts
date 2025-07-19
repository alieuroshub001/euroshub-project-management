// src/models/hr/Attendance.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IAttendance extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  clockIn: Date;
  clockOut?: Date;
  totalHours?: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    clockIn: { 
      type: Date, 
      required: true 
    },
    clockOut: { type: Date },
    totalHours: { 
      type: Number, 
      min: 0,
      max: 24 
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'half-day'],
      default: 'present'
    },
    notes: { 
      type: String, 
      trim: true,
      maxlength: 500 
    }
  },
  { timestamps: true }
);

// Indexes
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });

// Pre-save hook to calculate totalHours
attendanceSchema.pre<IAttendance>('save', function(next) {
  if (this.clockOut && this.clockIn) {
    this.totalHours = (this.clockOut.getTime() - this.clockIn.getTime()) / (1000 * 60 * 60);
  }
  next();
});

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);