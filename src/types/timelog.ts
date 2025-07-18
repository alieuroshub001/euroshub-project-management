//types/timelog.ts

export interface TimeLog {
  _id: string;
  userId: string;
  projectId?: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  screenshots: Screenshot[];
  activityScore?: number;
  idleTime?: number;
  manualAdjustment?: boolean;
  notes?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Screenshot {
  url: string;
  thumbnailUrl: string;
  timestamp: Date;
  blurred?: boolean;
}

export interface Timesheet {
  _id: string;
  userId: string;
  weekStart: Date;
  weekEnd: Date;
  logs: string[]; // TimeLog IDs
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalHours: number;
  submittedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}