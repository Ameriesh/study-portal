import type { ReactNode } from 'react';
import type { Notification } from '../../../../../contracts/api-contracts';
import { useAuthStore } from '../../../../../store/auth.store';
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const LEVEL_LABELS: Record<Notification['level'], string> = {
  INFO: 'Info',
  WARNING: 'Attention',
  ERROR: 'Erreur',
};

const LEVEL_BADGE: Record<Notification['level'], string> = {
  INFO: 'badge-primary',
  WARNING: 'badge-secondary',
  ERROR: 'bg-red-100 text-red-700 text-xs font-semibold rounded-full px-3 py-0.5',
};

const LEVEL_ICON: Record<Notification['level'], ReactNode> = {
  INFO: <InformationCircleIcon className="h-4 w-4 text-primary" />,
  WARNING: <ExclamationTriangleIcon className="h-4 w-4 text-secondary" />,
  ERROR: <XCircleIcon className="h-4 w-4 text-red-600" />,
};

interface NotificationTableRowProps {
  notif: Notification;
}

export default function NotificationTableRow({ notif }: NotificationTableRowProps) {
  const markAsRead = useAuthStore((state) => state.markAsRead);

  return (
    <tr
      className={`border-b border-border last:border-b-0 ${
        notif.read ? 'bg-background/30' : 'bg-primary/[0.03]'
      }`}
    >
      <td className="px-4 py-3">
        <div className="flex items-start gap-2 min-w-0">
          <span className="mt-0.5 shrink-0">{LEVEL_ICON[notif.level]}</span>
          <p
            className={`text-sm min-w-0 ${
              notif.read ? 'text-gray-500' : 'text-foreground font-semibold'
            }`}
          >
            {notif.message}
          </p>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className={LEVEL_BADGE[notif.level]}>{LEVEL_LABELS[notif.level]}</span>
      </td>
      <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
        {new Date(notif.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {notif.read ? (
          <span className="text-xs font-semibold text-gray-400">Lu</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Non lu
          </span>
        )}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {!notif.read ? (
          <button
            type="button"
            onClick={() => markAsRead(notif.id)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
          >
            Marquer comme lu
          </button>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}
