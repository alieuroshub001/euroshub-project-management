// types/common.ts

export type Role = 'super-admin' | 'admin' | 'manager' | 'team' | 'client';
export type Status = 'active' | 'inactive' | 'pending' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Visibility = 'public' | 'private' | 'team';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export type DateRange = {
  start: Date;
  end: Date;
};

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
  search?: string;
  select?: string;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
  icon?: string;
}

export interface KeyValuePair {
  key: string;
  value: any;
}

export type Theme = 'light' | 'dark' | 'system';