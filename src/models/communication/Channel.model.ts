// src/models/communication/Channel.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IChannel extends Document {
  name: string;
  description?: string;
  isPrivate: boolean;
  memberIds: Schema.Types.ObjectId[];
  projectId?: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  lastMessageAt?: Date;
}

const channelSchema = new Schema<IChannel>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100 
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 500 
    },
    isPrivate: { 
      type: Boolean, 
      default: false 
    },
    memberIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    }],
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project' 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    lastMessageAt: { type: Date }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
channelSchema.index({ name: 'text', description: 'text' });
channelSchema.index({ isPrivate: 1 });
channelSchema.index({ memberIds: 1 });
channelSchema.index({ projectId: 1 });
channelSchema.index({ lastMessageAt: -1 });

export const Channel = model<IChannel>('Channel', channelSchema);