import type { Ticket } from '../../contracts/api-contracts';

// Mock ticket data — simulates API response from backend
export const ticketsMock: Ticket[] = [
  {
    id: 'ticket-001',
    title: 'Problème accès plateforme e-learning',
    description: 'Impossible de se connecter au module de cours en ligne depuis 2 jours.',
    status: 'OPEN',
    priority: 'HIGH',
    createdAt: '2024-03-01T09:00:00Z',
    createdBy: 'basic-uuid-0002',
  },
  {
    id: 'ticket-002',
    title: 'Demande attestation de scolarité',
    description: 'Besoin d\'une attestation pour dossier de bourse.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: '2024-03-05T14:30:00Z',
    createdBy: 'basic-uuid-0002',
  },
  {
    id: 'ticket-003',
    title: 'Erreur dans le relevé de notes',
    description: 'La note du module TypeScript est incorrecte sur le relevé officiel.',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2024-03-10T11:15:00Z',
    createdBy: 'admin-uuid-0001',
  },
  {
    id: 'ticket-004',
    title: 'Mise à jour coordonnées personnelles',
    description: 'Changement d\'adresse email et numéro de téléphone.',
    status: 'CLOSED',
    priority: 'LOW',
    createdAt: '2024-03-12T16:00:00Z',
    createdBy: 'basic-uuid-0002',
  },
];