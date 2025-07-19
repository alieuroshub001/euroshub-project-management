// src/models/file/Attachment.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IAttachment extends Document {
  fileId: Schema.Types.ObjectId;
  attachedTo: {
    type: 'message' | 'task' | 'project' | 'user';
    id: Schema.Types.ObjectId;
  };
  uploadedBy: Schema.Types.ObjectId;
  isEmbedded: boolean;
  description?: string;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    fileId: { 
      type: Schema.Types.ObjectId, 
      ref: 'File', 
      required: true 
    },
    attachedTo: {
      type: {
        type: String,
        enum: ['message', 'task', 'project', 'user'],
        required: true
      },
      id: { 
        type: Schema.Types.ObjectId, 
        required: true,
        index: true 
      }
    },
    uploadedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    isEmbedded: { 
      type: Boolean, 
      default: false 
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 500 
    }
  },
  { timestamps: true }
);

// Compound indexes
attachmentSchema.index({ 'attachedTo.type': 1, 'attachedTo.id': 1 });
attachmentSchema.index({ fileId: 1 });
attachmentSchema.index({ uploadedBy: 1 });

export const Attachment = model<IAttachment>('Attachment', attachmentSchema);