import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, createElement } from 'react';
import { LazyPage } from '../components/LazyPage';
import { PrivateRoute } from '../components/PrivateRoute';

const LoginPage = lazy(
  () => import('../portals/auth-portal/pages/LoginPage')
);

const DashboardPage = lazy(
  () => import('../portals/main-portal/pages/DashboardPage')
);
const TicketsPage = lazy(
  () => import('../portals/main-portal/features/tickets/pages/TicketsPage')
);
const TicketCreatePage = lazy(
  () => import('../portals/main-portal/features/tickets/pages/TicketCreatePage')
);
const DocumentsPage = lazy(
  () => import('../portals/main-portal/features/documents/Pages/DocumentsPage')
);
const DocumentUploadPage = lazy(
  () => import('../portals/main-portal/features/documents/Pages/DocumentUploadPage')
);
const NotificationsPage = lazy(
  () => import('../portals/main-portal/features/notifications/pages/NotificationsPage')
);


export const router = createBrowserRouter([
  {
    path: '/login',
    element: createElement(LazyPage, { page: LoginPage }),
  },
  {
    path: '/',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: DashboardPage })
    ),
  },
   {
    path: '/tickets',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: TicketsPage })
    ),
  },
  {
    path: '/tickets/create',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: TicketCreatePage })
    ),
  },
  {
    path: '/documents',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: DocumentsPage })
    ),
  },
  {
    path: '/documents/upload',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: DocumentUploadPage })
    ),
  },
  {
    path: '/notifications',
    element: createElement(
      PrivateRoute,
      null,
      createElement(LazyPage, { page: NotificationsPage })
    ),
  },
  {
    path: '*',
    element: createElement(Navigate, { to: '/', replace: true }),
  },
]);