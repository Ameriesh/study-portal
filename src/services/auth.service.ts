import keycloak from './keycloak.service';
import { mockKeycloak } from './mock/keycloak.mock';
import { useAuthStore } from '../store/auth.store';
import type { AuthUser } from '../contracts/api-contracts';


const isMockMode = import.meta.env.VITE_MOCK_AUTH === 'true';


export const authService = {
  async init(): Promise<boolean> {
    if (isMockMode) {
      // In mock mode, check if a mock session exists
      const user = mockKeycloak.getUser();
      if (user) {
        useAuthStore.getState().setUser(user);
        return true;
      }
      return false;
    }

    // Real Keycloak init — checks for existing session
    try {
      const authenticated = await keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      });

      if (authenticated) {
        const user = this.decodeToken();
        if (user) useAuthStore.getState().setUser(user);
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak init failed:', error);
      return false;
    }
  },

  // Login with a mock profile (mock mode only)
  loginWithMock(profileKey: 'admin' | 'basic'): void {
    mockKeycloak.login(profileKey);
    const user = mockKeycloak.getUser();
    if (user) useAuthStore.getState().setUser(user);
  },

  // Logout — works in both modes
  logout(): void {
    if (isMockMode) {
      mockKeycloak.logout();
    } else {
      keycloak.logout();
    }
    useAuthStore.getState().clearUser();
  },

  // Get the current JWT token string
  getToken(): string | null {
    if (isMockMode) {
      return mockKeycloak.getToken();
    }
    return keycloak.token ?? null;
  },

  // Decode the real Keycloak token into an AuthUser object
  decodeToken(): AuthUser | null {
    if (!keycloak.tokenParsed) return null;
    return keycloak.tokenParsed as AuthUser;
  },
};