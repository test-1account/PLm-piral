// Sample test for JWT utilities
import {
  getToken,
  setToken,
  removeToken,
  decodeToken,
  isTokenExpired,
  getCurrentUser,
  hasRole,
} from './jwt';

// Mock localStorage
const mockLocalStorage = () => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage(),
});

// Sample JWT token for testing (expires in year 2030)
const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.invalid-signature-for-testing';

describe('JWT utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Token management', () => {
    test('should set and get token from localStorage', () => {
      setToken(mockToken);
      expect(getToken()).toBe(mockToken);
    });

    test('should remove token from localStorage', () => {
      setToken(mockToken);
      removeToken();
      expect(getToken()).toBeNull();
    });

    test('should return null when no token exists', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('Token decoding', () => {
    test('should decode valid JWT token', () => {
      const decoded = decodeToken(mockToken);
      expect(decoded).toBeTruthy();
      expect(decoded?.sub).toBe('1234567890');
      expect(decoded?.email).toBe('test@example.com');
      expect(decoded?.name).toBe('John Doe');
      expect(decoded?.roles).toEqual(['admin', 'user']);
    });

    test('should return null for invalid token', () => {
      const decoded = decodeToken('invalid-token');
      expect(decoded).toBeNull();
    });
  });

  describe('Token expiration', () => {
    test('should detect non-expired token', () => {
      expect(isTokenExpired(mockToken)).toBe(false);
    });

    test('should detect invalid token as expired', () => {
      expect(isTokenExpired('invalid-token')).toBe(true);
    });
  });

  describe('User management', () => {
    test('should get current user from valid token', () => {
      setToken(mockToken);
      const user = getCurrentUser();

      expect(user).toBeTruthy();
      expect(user?.id).toBe('1234567890');
      expect(user?.email).toBe('test@example.com');
      expect(user?.name).toBe('John Doe');
      expect(user?.roles).toEqual(['admin', 'user']);
    });

    test('should return null when no token exists', () => {
      const user = getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe('Role checking', () => {
    test('should check user roles correctly', () => {
      setToken(mockToken);

      expect(hasRole('admin')).toBe(true);
      expect(hasRole('user')).toBe(true);
      expect(hasRole('guest')).toBe(false);
    });

    test('should return false when no user is logged in', () => {
      expect(hasRole('admin')).toBe(false);
    });
  });
});
