import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePermissions } from '../hooks/usePermissions';
import { useAuthStore } from '../store/auth.store';
import { adminUserMock, basicUserMock } from '../services/mock/auth.mock';


beforeEach(() => {
  useAuthStore.getState().clearUser();
});

describe('usePermissions', () => {

  describe('hasPermission — admin profile', () => {

    it('returns true for ticket:create with admin profile', () => {
      // Set admin user in store
      useAuthStore.getState().setUser(adminUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('ticket:create')).toBe(true);
    });

    it('returns true for document:upload with admin profile', () => {
      useAuthStore.getState().setUser(adminUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('document:upload')).toBe(true);
    });

    it('returns true for notification:read with admin profile', () => {
      useAuthStore.getState().setUser(adminUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('notification:read')).toBe(true);
    });

  });

  // ----------------------------------------------------------
  // hasPermission — basic profile
  // ----------------------------------------------------------
  describe('hasPermission — basic profile', () => {

    it('returns false for ticket:create with basic profile', () => {
      // Set basic user in store
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('ticket:create')).toBe(false);
    });

    it('returns false for document:upload with basic profile', () => {
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('document:upload')).toBe(false);
    });

    it('returns true for ticket:read with basic profile', () => {
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      // basic user HAS ticket:read
      expect(result.current.hasPermission('ticket:read')).toBe(true);
    });

  });


  describe('hasPermission — no user', () => {

    it('returns false for any permission when no user is logged in', () => {
      // Store is already cleared by beforeEach
      const { result } = renderHook(() => usePermissions());

      expect(result.current.hasPermission('ticket:create')).toBe(false);
      expect(result.current.hasPermission('ticket:read')).toBe(false);
    });

    it('returns empty authorities array when no user is logged in', () => {
      const { result } = renderHook(() => usePermissions());

      expect(result.current.authorities).toEqual([]);
    });

  });

  describe('hasAnyPermission', () => {

    it('returns true if user has at least one of the permissions', () => {
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      // basic has ticket:read but not ticket:create
      expect(
        result.current.hasAnyPermission(['ticket:create', 'ticket:read'])
      ).toBe(true);
    });

    it('returns false if user has none of the permissions', () => {
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      // basic has neither ticket:create nor document:upload
      expect(
        result.current.hasAnyPermission(['ticket:create', 'document:upload'])
      ).toBe(false);
    });

  });


  describe('hasAllPermissions', () => {

    it('returns true if admin has all permissions in the list', () => {
      useAuthStore.getState().setUser(adminUserMock);

      const { result } = renderHook(() => usePermissions());

      expect(
        result.current.hasAllPermissions(['ticket:create', 'ticket:read', 'document:upload'])
      ).toBe(true);
    });

    it('returns false if basic is missing one permission in the list', () => {
      useAuthStore.getState().setUser(basicUserMock);

      const { result } = renderHook(() => usePermissions());

      // basic has ticket:read but NOT ticket:create
      expect(
        result.current.hasAllPermissions(['ticket:create', 'ticket:read'])
      ).toBe(false);
    });

  });

});