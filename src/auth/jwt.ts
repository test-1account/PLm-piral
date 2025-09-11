// JWT authentication utilities
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  roles: string[];
  exp: number;
  iat: number;
}

// Get JWT token from localStorage
export function getToken(): string | null {
  return localStorage.getItem('plm_jwt_token');
}

// Set JWT token in localStorage
export function setToken(token: string): void {
  localStorage.setItem('plm_jwt_token', token);
}

// Remove JWT token from localStorage
export function removeToken(): void {
  localStorage.removeItem('plm_jwt_token');
}

// Decode JWT token (basic decode, doesn't verify signature)
export function decodeToken(token: string): JWTPayload | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  return Date.now() >= decoded.exp * 1000;
}

// Get current user from token
export function getCurrentUser(): User | null {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) return null;

  return {
    id: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    roles: decoded.roles,
  };
}

// Check if user has specific role
export function hasRole(role: string): boolean {
  const user = getCurrentUser();
  return user?.roles.includes(role) || false;
}
