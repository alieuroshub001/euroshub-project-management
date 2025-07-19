// src/models/time/Timelog.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ITimeLog extends Document {
  userId: Schema.Types.ObjectId;
  projectId?: Schema.Types.ObjectId;
  taskId?: Schema.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  activityScore?: number;
  idleTime?: number;
  manualAdjustment?: boolean;
  notes?: string;
  approved?: boolean;
  approvedBy?: Schema.Types.ObjectId;
  approvedAt?: Date;
}

const timeLogSchema = new Schema<ITimeLog>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project' 
    },
    taskId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Task' 
    },
    startTime: { 
      type: Date, 
      required: true,
      index: true 
    },
    endTime: { 
      type: Date,
      index: true 
    },
    duration: { 
      type: Number, 
      min: 0, 
      default: 0 
    },
    activityScore: { 
      type: Number, 
      min: 0, 
      max: 100 
    },
    idleTime: { 
      type: Number, 
      min: 0 
    },
    manualAdjustment: { 
      type: Boolean, 
      default: false 
    },
    notes: { 
      type: String, 
      trim: true,
      maxlength: 500 
    },
    approved: { 
      type: Boolean, 
      default: false 
    },
    approvedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    approvedAt: { type: Date }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
timeLogSchema.index({ userId: 1 });
timeLogSchema.index({ projectId: 1 });
timeLogSchema.index({ taskId: 1 });
timeLogSchema.index({ startTime: -1 });
timeLogSchema.index({ approved: 1 });

// Pre-save hook to calculate duration
timeLogSchema.pre<ITimeLog>('save', function(next) {
  if (this.endTime && this.startTime) {
    this.duration = Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 1000);
  }
  next();
});

export const TimeLog = model<ITimeLog>('TimeLog', timeLogSchema);