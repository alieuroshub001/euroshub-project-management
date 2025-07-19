// src/models/analytics/ActivityLog.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IActivityLog extends Document {
  userId: Schema.Types.ObjectId;
  action: string;
  entityType?: 'project' | 'task' | 'user' | 'timeLog';
  entityId?: Schema.Types.ObjectId;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    action: { 
      type: String, 
      required: true,
      trim: true,
      index: true 
    },
    entityType: { 
      type: String, 
      enum: ['project', 'task', 'user', 'timeLog'],
      index: true 
    },
    entityId: { 
      type: Schema.Types.ObjectId,
      index: true 
    },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes for common query patterns
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ createdAt: -1 });

// TTL index for automatic log rotation (1 year retention)
activityLogSchema.index({ createdAt: 1 }, { 
  expireAfterSeconds: 31536000 
});

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema);