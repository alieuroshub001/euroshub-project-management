//types/calendar.ts

export interface CalendarEvent {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  type: 'task' | 'meeting' | 'leave' | 'reminder' | 'other';
  relatedId?: string; // taskId, meetingId, etc
  projectId?: string;
  createdBy: string;
  participants?: string[]; // user IDs
  color?: string;
  description?: string;
  location?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies: string[];
  projectId: string;
  assigneeId?: string;
  type: 'task' | 'milestone';
}