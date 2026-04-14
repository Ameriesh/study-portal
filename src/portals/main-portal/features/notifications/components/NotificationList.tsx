import type { Notification } from '../../../../../contracts/api-contracts';
import NotificationTableRow from './NotificationTableRow';

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-background/70 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Message
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Niveau
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Statut
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif) => (
              <NotificationTableRow key={notif.id} notif={notif} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
