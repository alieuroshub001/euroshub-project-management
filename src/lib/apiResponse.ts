import { ApiResponse, PaginatedResponse } from '@/types/common';

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || 'Operation successful',
  };
}

export function errorResponse(message: string, statusCode?: number): ApiResponse {
  return {
    success: false,
    error: message,
    statusCode: statusCode || 400,
  };
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    total,
    page,
    limit,
    hasNext: page * limit < total,
  };
}