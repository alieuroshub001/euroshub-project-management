// src/models/Settings/UserSettings.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IFile extends Document {
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: Schema.Types.ObjectId;
  parentType: 'project' | 'task' | 'message' | 'user' | 'document';
  parentId: Schema.Types.ObjectId;
  thumbnailUrl?: string;
  metadata?: any;
  storagePath: string;
  isPublic: boolean;
  accessList: Schema.Types.ObjectId[];
}

const fileSchema = new Schema<IFile>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 255 
    },
    url: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true,
      trim: true 
    },
    size: { 
      type: Number, 
      required: true,
      min: 0 
    },
    uploadedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    parentType: {
      type: String,
      enum: ['project', 'task', 'message', 'user', 'document'],
      required: true
    },
    parentId: { 
      type: Schema.Types.ObjectId, 
      required: true,
      index: true 
    },
    thumbnailUrl: { type: String },
    metadata: { type: Schema.Types.Mixed },
    storagePath: { 
      type: String, 
      required: true,
      select: false 
    },
    isPublic: { 
      type: Boolean, 
      default: false 
    },
    accessList: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
fileSchema.index({ name: 'text' });
fileSchema.index({ parentType: 1, parentId: 1 });
fileSchema.index({ uploadedBy: 1 });
fileSchema.index({ type: 1 });
fileSchema.index({ isPublic: 1 });
fileSchema.index({ createdAt: -1 });

// Virtual for file extension
fileSchema.virtual('extension').get(function() {
  if (typeof this.name === 'string') {
    const ext = this.name.split('.').pop();
    return ext ? ext.toLowerCase() : '';
  }
  return '';
});

export const File = model<IFile>('File', fileSchema);