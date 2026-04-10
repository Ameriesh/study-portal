import type { AuthUser } from '../../contracts/api-contracts';
import { mockProfiles } from './auth.mock';

const MOCK_USER_KEY = 'mock_auth_user';

export const mockKeycloak = {
  login(profileKey: 'admin' | 'basic'): void {
    const user = mockProfiles[profileKey];
    sessionStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
  },

  logout(): void {
    sessionStorage.removeItem(MOCK_USER_KEY);
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

  getToken(): string | null {
    const user = this.getUser();
    if (!user) return null;
    return `mock-jwt-token-${user.sub}`;
  },
};