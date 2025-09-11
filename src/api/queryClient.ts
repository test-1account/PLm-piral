// React Query client configuration
import { QueryClient } from '@tanstack/react-query';
import { getToken } from '../auth/jwt';

// Default query configuration
const queryConfig = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 1,
  },
};

// Create QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Base API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Generic fetch function with JWT auth
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Common query keys factory
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  products: ['products'] as const,
  product: (id: string) => ['products', id] as const,
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
} as const;
