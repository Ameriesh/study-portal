import { useEffect, useState, useRef } from 'react';
import {
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { authService } from '../../services/auth.service';
import { usePermissions } from '../../hooks/usePermissions';
import { notificationsMock } from '../../services/mock/notifications.mock';
import ProtectedComponent from '../ProtectedComponent';

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const unreadCount = useAuthStore((state) => state.unreadCount);
  const setNotifications = useAuthStore((state) => state.setNotifications);
  const { hasPermission } = usePermissions();

  // Controls the profile dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load notifications on mount if user has permission
  useEffect(() => {
    if (hasPermission('notification:read')) {
      const timer = setTimeout(() => {
        setNotifications(notificationsMock);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasPermission, setNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    setIsDropdownOpen(false);
    authService.logout();
    navigate('/login', { replace: true });
  }

  const initials = user?.preferred_username
    ?.split('.')
    .map((w) => w[0]?.toUpperCase())
    .join('') ?? 'US';

  const displayName = user?.preferred_username ?? 'Utilisateur';
  const role = user?.realm_access?.roles?.[0] ?? 'Étudiant';

  return (
    <header className="bg-surface border border-border rounded-3xl px-6 py-4 flex items-center justify-between mb-6">

      {/* Page title */}
      <h1 className="title">
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Organization */}
        <div className="hidden md:flex items-center gap-2 text-md text-gray-700">
          <BuildingOfficeIcon className="w-5 h-5" />
          <span>Mon organisation</span>
        </div>

        <ProtectedComponent permissions={['notification:read']}>
          <Link
            to="/notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
        </ProtectedComponent>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>

          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-primary/5 transition-colors"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
              {initials}
            </div>

            {/* Name + role */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {displayName}
              </p>
              <p className="text-xs text-gray-400 capitalize leading-tight">
                {role.toLowerCase()}
              </p>
            </div>

            <ChevronDownIcon
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">

              {/* User info header */}
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>

              {/* Logout option */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Se déconnecter
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}