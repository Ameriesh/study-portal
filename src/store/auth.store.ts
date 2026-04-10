import { create } from 'zustand';
import type { AuthUser, Notification } from '../contracts/api-contracts';


interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;      
  notifications: Notification[];
  unreadCount: number;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setInitializing: (value: boolean) => void;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,        
  notifications: [],
  unreadCount: 0,

  // --- Auth actions ---
  setUser: (user: AuthUser) =>
    set({ user, isAuthenticated: true, isInitializing: false }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      notifications: [],
      unreadCount: 0,
    }),

  setInitializing: (value: boolean) =>
    set({ isInitializing: value }),

  // --- Notification actions ---
  setNotifications: (notifications: Notification[]) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),

  markAsRead: (id: string) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));