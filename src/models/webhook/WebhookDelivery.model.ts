// src/models/webhook/WebhookDelivery.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IWebhookDelivery extends Document {
  webhookId: Schema.Types.ObjectId;
  event: string;
  payload: any;
  status: 'pending' | 'success' | 'failed';
  responseCode?: number;
  responseBody?: string;
  attemptCount: number;
  nextRetryAt?: Date;
  error?: string;
  deliveryTime?: number; // in milliseconds
}

const webhookDeliverySchema = new Schema<IWebhookDelivery>(
  {
    webhookId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Webhook', 
      required: true 
    },
    event: { 
      type: String, 
      required: true,
      trim: true 
    },
    payload: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    },
    responseCode: { type: Number },
    responseBody: { type: String },
    attemptCount: { 
      type: Number, 
      default: 0,
      min: 0 
    },
    nextRetryAt: { type: Date },
    error: { 
      type: String, 
      trim: true 
    },
    deliveryTime: { type: Number } // milliseconds
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
webhookDeliverySchema.index({ webhookId: 1 });
webhookDeliverySchema.index({ status: 1 });
webhookDeliverySchema.index({ createdAt: -1 });
webhookDeliverySchema.index({ nextRetryAt: 1 });
webhookDeliverySchema.index({ event: 1 });

// TTL index for completed deliveries (30 days retention)
webhookDeliverySchema.index({ 
  createdAt: 1 
}, { 
  expireAfterSeconds: 2592000, 
  partialFilterExpression: { 
    status: { $in: ['success', 'failed'] } 
  } 
});

export const WebhookDelivery = model<IWebhookDelivery>('WebhookDelivery', webhookDeliverySchema);