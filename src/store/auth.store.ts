import { create } from 'zustand';
import type { AuthUser } from '../contracts/api-contracts';

interface AuthState {
  user: AuthUser | null;        
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: AuthUser) =>
    set({ user, isAuthenticated: true }),

  clearUser: () =>
    set({ user: null, isAuthenticated: false }),
}));