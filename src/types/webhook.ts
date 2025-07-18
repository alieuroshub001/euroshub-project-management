// types/webhook.ts

export type WebhookEvent =
  | 'task.created'
  | 'task.updated'
  | 'task.completed'
  | 'project.created'
  | 'project.updated'
  | 'timeLog.created'
  | 'timeLog.approved'
  | 'user.invited'
  | 'user.joined'
  | 'comment.created';

export interface Webhook {
  _id: string;
  name: string;
  url: string;
  events: WebhookEvent[];
  secret?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookPayload<T = any> {
  event: WebhookEvent;
  data: T;
  timestamp: Date;
  signature?: string;
}

export interface WebhookDelivery {
  _id: string;
  webhookId: string;
  event: WebhookEvent;
  status: 'pending' | 'success' | 'failed';
  responseCode?: number;
  responseBody?: string;
  attemptCount: number;
  lastAttemptAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookTestRequest {
  url: string;
  secret?: string;
  event: WebhookEvent;
  payload: any;
}