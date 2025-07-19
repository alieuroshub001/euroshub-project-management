// src/models/communication/Notification.model.ts

import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: 'mention' | 'message' | 'approval' | 'system';
  message: string;
  read: boolean;
  link?: string;
  relatedId?: Schema.Types.ObjectId;
  relatedModel?: 'Message' | 'Task' | 'TimeLog';
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    type: {
      type: String,
      enum: ['mention', 'message', 'approval', 'system'],
      required: true
    },
    message: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 500 
    },
    read: { 
      type: Boolean, 
      default: false 
    },
    link: { 
      type: String, 
      trim: true 
    },
    relatedId: { 
      type: Schema.Types.ObjectId,
      refPath: 'relatedModel' 
    },
    relatedModel: {
      type: String,
      enum: ['Message', 'Task', 'TimeLog']
    }
  },
  { timestamps: true }
);

// Indexes
notificationSchema.index({ userId: 1 });
notificationSchema.index({ read: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ type: 1 });

// Set TTL for notifications (90 days)
notificationSchema.index({ createdAt: 1 }, { 
  expireAfterSeconds: 7776000 
});

export const Notification = model<INotification>('Notification', notificationSchema);