import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../../../../../components/shared/Layout';
import NotificationList from '../components/NotificationList';
import { BellSlashIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../../../../store/auth.store';
import { notificationsMock } from '../../../../../services/mock/notifications.mock';
import { usePermissions } from '../../../../../hooks/usePermissions';
import { ProtectedComponent } from '../../../../../components/ProtectedComponent';

export default function NotificationsPage() {
  const { notifications, setNotifications, markAllAsRead, unreadCount } =
    useAuthStore();
  const { hasPermission } = usePermissions();

  if (!hasPermission('notification:read')) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!hasPermission('notification:read')) return;
    const timer = setTimeout(() => {
      if (useAuthStore.getState().notifications.length === 0) {
        setNotifications(notificationsMock);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [hasPermission, setNotifications]);

  return (
    <Layout title="Notifications">
      <ProtectedComponent permissions={['notification:read']}>
        <div className="card h-full flex flex-col gap-8 shadow-sm">
          
          {/* Header avec une meilleure hiérarchie */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">
                Centre de notifications
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 {unreadCount > 0 ? (
                    <span className="badge-secondary animate-pulse">
                      {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                    </span>
                 ) : null}
                 <p className="text-sm text-gray-400">
                   {unreadCount > 0 ? "Vous avez des messages non lus" : "Toutes vos notifications ont été lues"}
                 </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary px-6 py-2.5 hover:scale-105 transition-transform"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Corps de la page */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-background/50 rounded-3xl border border-dashed border-border">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                   <BellSlashIcon className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-lg font-semibold text-foreground">Aucune notification</p>
                <p className="text-sm text-gray-400">Nous vous préviendrons dès qu'il y aura du nouveau.</p>
              </div>
            ) : (
              <NotificationList notifications={notifications} />
            )}
          </div>

        </div>
      </ProtectedComponent>
    </Layout>
  );
}