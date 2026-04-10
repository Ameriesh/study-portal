import type { Notification } from '../../contracts/api-contracts';

// Mock notification data — simulates API response from backend
export const notificationsMock: Notification[] = [
  {
    id: 'notif-001',
    message: 'Votre ticket #001 a été pris en charge.',
    level: 'INFO',
    read: false,
    createdAt: '2024-03-13T08:00:00Z',
  },
  {
    id: 'notif-002',
    message: 'Nouveau document disponible : Convocation examens.',
    level: 'INFO',
    read: false,
    createdAt: '2024-03-13T09:30:00Z',
  },
  {
    id: 'notif-003',
    message: 'Votre relevé de notes S1 est disponible.',
    level: 'INFO',
    read: true,
    createdAt: '2024-03-12T14:00:00Z',
  },
  {
    id: 'notif-004',
    message: 'Échéance paiement scolarité dans 7 jours.',
    level: 'WARNING',
    read: false,
    createdAt: '2024-03-11T10:00:00Z',
  },
];