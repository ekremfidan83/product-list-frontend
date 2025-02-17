export interface SpringResponse<T> {
  data: T;
  timestamp: string;
  status: number;
  message: string;
  path: string;
}

export interface SpringErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'name' | 'id';
  order?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
} 