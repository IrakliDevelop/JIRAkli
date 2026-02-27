import type { TicketStatus, TicketPriority } from '../constants';

// API Response types
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: FieldError[];
  timestamp: string;
}

export interface FieldError {
  field: string;
  message: string;
}

// Auth types
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  iat: number; // Issued at
  exp: number; // Expiration
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

// DTO types for create/update operations
export interface CreateProjectDto {
  key: string;
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

export interface CreateTicketDto {
  title: string;
  description?: string;
  priority?: TicketPriority;
  assigneeId?: string;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assigneeId?: string | null;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

// Query/filter types
export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  assigneeId?: string;
  reporterId?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
