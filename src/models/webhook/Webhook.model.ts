// src/models/webhook/Webhook.model.ts

import { Schema, model, Document } from 'mongoose';

export type WebhookEvent = 
  | 'task.created' | 'task.updated' | 'task.completed'
  | 'project.created' | 'project.updated'
  | 'timeLog.created' | 'timeLog.approved'
  | 'user.invited' | 'user.joined'
  | 'comment.created';

export interface IWebhook extends Document {
  name: string;
  url: string;
  events: WebhookEvent[];
  secret?: string;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  lastTriggeredAt?: Date;
  failureCount: number;
  retryPolicy: {
    enabled: boolean;
    maxAttempts: number;
    retryDelay: number; // in minutes
  };
}

const webhookSchema = new Schema<IWebhook>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100 
    },
    url: { 
      type: String, 
      required: true,
      trim: true,
      match: /^https?:\/\/.+/ 
    },
    events: [{
      type: String,
      enum: [
        'task.created', 'task.updated', 'task.completed',
        'project.created', 'project.updated',
        'timeLog.created', 'timeLog.approved',
        'user.invited', 'user.joined',
        'comment.created'
      ],
      required: true
    }],
    secret: { 
      type: String, 
      select: false,
      trim: true 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    lastTriggeredAt: { type: Date },
    failureCount: { 
      type: Number, 
      default: 0,
      min: 0 
    },
    retryPolicy: {
      enabled: { type: Boolean, default: true },
      maxAttempts: { type: Number, default: 3, min: 1, max: 10 },
      retryDelay: { type: Number, default: 5, min: 1, max: 60 } // minutes
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
webhookSchema.index({ createdBy: 1 });
webhookSchema.index({ isActive: 1 });
webhookSchema.index({ events: 1 });
webhookSchema.index({ lastTriggeredAt: -1 });

export const Webhook = model<IWebhook>('Webhook', webhookSchema);