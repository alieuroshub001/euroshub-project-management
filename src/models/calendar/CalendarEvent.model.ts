// src/models/calendar/CalendarEvent.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ICalendarEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  type: 'task' | 'meeting' | 'leave' | 'reminder' | 'other';
  relatedId?: Schema.Types.ObjectId;
  projectId?: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  color?: string;
  description?: string;
  location?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    excludedDates?: Date[];
  };
  reminders?: {
    method: 'email' | 'notification';
    minutesBefore: number;
    sent: boolean;
  }[];
}

const calendarEventSchema = new Schema<ICalendarEvent>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200 
    },
    start: { 
      type: Date, 
      required: true,
      index: true 
    },
    end: { 
      type: Date, 
      required: true,
      index: true 
    },
    allDay: { 
      type: Boolean, 
      default: false 
    },
    type: {
      type: String,
      enum: ['task', 'meeting', 'leave', 'reminder', 'other'],
      required: true
    },
    relatedId: { 
      type: Schema.Types.ObjectId,
      index: true 
    },
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project',
      index: true 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    participants: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    color: { 
      type: String,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      default: '#3b82f6'
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 2000 
    },
    location: { 
      type: String, 
      trim: true,
      maxlength: 200 
    },
    recurring: {
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
      },
      interval: { 
        type: Number, 
        min: 1 
      },
      endDate: { type: Date },
      excludedDates: [{ type: Date }]
    },
    reminders: [{
      method: {
        type: String,
        enum: ['email', 'notification']
      },
      minutesBefore: { 
        type: Number, 
        min: 0 
      },
      sent: { 
        type: Boolean, 
        default: false 
      }
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
calendarEventSchema.index({ start: 1, end: 1 });
calendarEventSchema.index({ createdBy: 1 });
calendarEventSchema.index({ participants: 1 });
calendarEventSchema.index({ type: 1 });
calendarEventSchema.index({ 'recurring.frequency': 1 });

// Virtual for event duration in hours
calendarEventSchema.virtual('durationHours').get(function() {
  return (this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60);
});

export const CalendarEvent = model<ICalendarEvent>('CalendarEvent', calendarEventSchema);