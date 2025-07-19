// src/models/communication/Message.model.ts

import { Schema, model, Document } from 'mongoose';
import { Channel } from './Channel.model';

export interface IMessage extends Document {
  channelId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  content: string;
  parentId?: Schema.Types.ObjectId;
  isThread: boolean;
  attachments?: string[];
  mentions?: Schema.Types.ObjectId[];
  edited: boolean;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    channelId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Channel', 
      required: true 
    },
    senderId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 5000 
    },
    parentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Message' 
    },
    isThread: { 
      type: Boolean, 
      default: false 
    },
    attachments: [{ type: String }],
    mentions: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    edited: { 
      type: Boolean, 
      default: false 
    },
    deleted: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
messageSchema.index({ channelId: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ parentId: 1 });
messageSchema.index({ isThread: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ mentions: 1 });

// Update channel's last message timestamp on new message
messageSchema.post('save', async function(doc) {
  await Channel.findByIdAndUpdate(doc.channelId, { 
    lastMessageAt: doc.createdAt 
  });
});

export const Message = model<IMessage>('Message', messageSchema);