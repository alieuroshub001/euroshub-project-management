// src/models/communication/Thread.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IThread extends Document {
  rootMessageId: Schema.Types.ObjectId;
  channelId: Schema.Types.ObjectId;
  messageIds: Schema.Types.ObjectId[];
  participantIds: Schema.Types.ObjectId[];
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: Schema.Types.ObjectId;
}

const threadSchema = new Schema<IThread>(
  {
    rootMessageId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Message', 
      required: true,
      unique: true 
    },
    channelId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Channel', 
      required: true 
    },
    messageIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Message' 
    }],
    participantIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    resolved: { 
      type: Boolean, 
      default: false 
    },
    resolvedAt: { type: Date },
    resolvedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
threadSchema.index({ channelId: 1 });
threadSchema.index({ participantIds: 1 });
threadSchema.index({ resolved: 1 });
threadSchema.index({ updatedAt: -1 });

export const Thread = model<IThread>('Thread', threadSchema);