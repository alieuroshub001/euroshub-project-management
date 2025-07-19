// src/models/communication/Reaction.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IReaction extends Document {
  messageId: Schema.Types.ObjectId;
  emoji: string;
  userIds: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
  {
    messageId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Message', 
      required: true 
    },
    emoji: { 
      type: String, 
      required: true,
      trim: true 
    },
    userIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  { timestamps: true }
);

// Compound unique index
reactionSchema.index({ messageId: 1, emoji: 1 }, { unique: true });

export const Reaction = model<IReaction>('Reaction', reactionSchema);