import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedComponent from '../components/ProtectedComponent';
import { adminUserMock, basicUserMock } from '../services/mock/auth.mock';
import { useAuthStore } from '../store/auth.store';

describe('ProtectedComponent', () => {
  beforeEach(() => {
    useAuthStore.getState().clearUser();
  });

  describe('single permission', () => {
    it('renders children when user has the required permission', () => {
      useAuthStore.getState().setUser(adminUserMock);

      render(
        <ProtectedComponent permission="ticket:create">
          <button>Créer un ticket</button>
        </ProtectedComponent>
      );

      expect(screen.getByText('Créer un ticket')).toBeInTheDocument();
    });

    it('renders nothing when user lacks the required permission', () => {
      useAuthStore.getState().setUser(basicUserMock);

      render(
        <ProtectedComponent permission="ticket:create">
          <button>Créer un ticket</button>
        </ProtectedComponent>
      );

      expect(screen.queryByText('Créer un ticket')).not.toBeInTheDocument();
    });

    it('renders nothing when no user is logged in', () => {
      render(
        <ProtectedComponent permission="ticket:read">
          <p>Liste des tickets</p>
        </ProtectedComponent>
      );

      expect(screen.queryByText('Liste des tickets')).not.toBeInTheDocument();
    });
  });

  describe('multiple permissions — AND logic', () => {
    it('renders children when user has ALL required permissions', () => {
      useAuthStore.getState().setUser(adminUserMock);

      render(
        <ProtectedComponent permissions={['ticket:create', 'ticket:update']}>
          <span>Actions admin</span>
        </ProtectedComponent>
      );

      expect(screen.getByText('Actions admin')).toBeInTheDocument();
    });

    it('renders nothing when user is missing one of the permissions', () => {
      useAuthStore.getState().setUser(basicUserMock);

      render(
        <ProtectedComponent permissions={['ticket:create', 'ticket:read']}>
          <span>Actions admin</span>
        </ProtectedComponent>
      );

      expect(screen.queryByText('Actions admin')).not.toBeInTheDocument();
    });
  });

  describe('multiple permissions — OR logic (requireAny)', () => {
    it('renders children when user has at least one permission', () => {
      useAuthStore.getState().setUser(basicUserMock);

      render(
        <ProtectedComponent
          permissions={['ticket:create', 'ticket:read']}
          requireAny
        >
          <span>Visible si ticket:read ou ticket:create</span>
        </ProtectedComponent>
      );

      expect(
        screen.getByText('Visible si ticket:read ou ticket:create')
      ).toBeInTheDocument();
    });
  });

  describe('no permission specified', () => {
    it('always renders children when no permission is required', () => {
      render(
        <ProtectedComponent>
          <p>Contenu public</p>
        </ProtectedComponent>
      );

      expect(screen.getByText('Contenu public')).toBeInTheDocument();
    });
  });
});
