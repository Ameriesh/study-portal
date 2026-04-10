import type { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';


interface ProtectedComponentProps {
  permission?: string;
  permissions?: string[];
  requireAny?: boolean;
  children: ReactNode;
}

export function ProtectedComponent({
  permission,
  permissions,
  requireAny = false,
  children,
}: ProtectedComponentProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  function isAuthorized(): boolean {
    // Case 1 — single permission provided
    if (permission) {
      return hasPermission(permission);
    }

    // Case 2 — multiple permissions provided
    if (permissions && permissions.length > 0) {
      return requireAny
        ? hasAnyPermission(permissions)   
        : hasAllPermissions(permissions);
    }

    // Case 3 — no permission specified → always render
    return true;
  }

  if (!isAuthorized()) {
    return null;
  }

  return <>{children}</>;
}