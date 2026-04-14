import { BuildingOfficeIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { authService } from '../../services/auth.service';


interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const initials = user?.preferred_username
    ?.split('.')
    .map((w) => w[0]?.toUpperCase())
    .join('') ?? 'US';

  const displayName = user?.preferred_username ?? 'Utilisateur';
  const role = user?.realm_access?.roles?.[0] ?? 'Étudiant';

  function handleLogout() {
    authService.logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="bg-surface border border-border rounded-3xl px-6 py-4 flex items-center justify-between mb-6">

      {/* Page title */}
      <h1 className="title">
        {title}
      </h1>

      {/* Right side — org + notifications + user */}
      <div className="flex items-center gap-4">

        {/* Organization */}
        <div className="hidden md:flex items-center gap-2 text-md text-gray-700">
          <BuildingOfficeIcon className="w-5 h-5" />
          <span>Mon organisation</span>
        </div>

        {/* Notification bell */}
        

        {/* User info */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
            {initials}
          </div>

          {/* Name + role */}
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {displayName}
            </p>
            <p className="text-xs text-gray-400 capitalize leading-tight">
              {role.toLowerCase()}
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Déconnexion
        </button>

      </div>
    </header>
  );
}