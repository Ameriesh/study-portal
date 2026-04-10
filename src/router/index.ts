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
    path: '*',
    element: createElement(Navigate, { to: '/', replace: true }),
  },
]);