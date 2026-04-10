import { useAuthStore } from '../store/auth.store';

export function usePermissions() {
  const user = useAuthStore((state) => state.user);

  const authorities: string[] = user?.authorities ?? [];

  function hasPermission(scope: string): boolean {
    return authorities.includes(scope);
  }

  function hasAnyPermission(scopes: string[]): boolean {
    return scopes.some((scope) => authorities.includes(scope));
  }

  function hasAllPermissions(scopes: string[]): boolean {
    return scopes.every((scope) => authorities.includes(scope));
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    authorities,         
  };
}