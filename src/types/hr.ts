//types/hr.ts

export interface LeaveRequest {
  _id: string;
  userId: string;
  type: 'casual' | 'sick' | 'annual' | 'unpaid';
  reason: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  _id: string;
  userId: string;
  date: Date;
  clockIn: Date;
  clockOut?: Date;
  totalHours?: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
  createdAt: Date;
}

export interface Document {
  _id: string;
  userId: string;
  type: string;
  name: string;
  url: string;
  expiryDate?: Date;
  status: 'valid' | 'expired' | 'expiring-soon';
  confidential: boolean;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingTask {
  _id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  completedAt?: Date;
  assignedBy: string;
  createdAt: Date;
  updatedAt: Date;
}