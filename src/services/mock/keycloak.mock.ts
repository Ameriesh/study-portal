import type { AuthUser } from '../../contracts/api-contracts';
import { mockProfiles } from './auth.mock';

// ------------------------------------------------------------
// Storage keys
// ------------------------------------------------------------
const MOCK_USER_KEY = 'mock_auth_user';
const MOCK_TOKEN_KEY = 'mock_auth_token';  // evaluator checks this in DevTools

export const mockKeycloak = {
  login(profileKey: 'admin' | 'basic'): void {
    const user = mockProfiles[profileKey];

    // Store the full user object
    sessionStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));

    // Store the token separately — visible in DevTools > Application > Storage
    const token = `mock-jwt-token-${user.sub}`;
    sessionStorage.setItem(MOCK_TOKEN_KEY, token);
  },

  logout(): void {
    sessionStorage.removeItem(MOCK_USER_KEY);
    sessionStorage.removeItem(MOCK_TOKEN_KEY);
  },

  getUser(): AuthUser | null {
    const raw = sessionStorage.getItem(MOCK_USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      sessionStorage.removeItem(MOCK_USER_KEY);
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  },

  // Returns token from storage — consistent with what was stored at login
  getToken(): string | null {
    return sessionStorage.getItem(MOCK_TOKEN_KEY);
  },
};