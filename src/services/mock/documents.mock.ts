import type { Document } from '../../contracts/api-contracts';

// Mock document data — simulates API response from backend
export const documentsMock: Document[] = [
  {
    id: 'doc-001',
    name: 'Attestation_scolarite_2024.pdf',
    type: 'PDF',
    size: 245760,             
    uploadedAt: '2024-03-01T10:00:00Z',
    uploadedBy: 'admin-uuid-0001',
    url: '/mock-files/attestation.pdf',
  },
  {
    id: 'doc-002',
    name: 'Releve_notes_S1.pdf',
    type: 'PDF',
    size: 512000,             
    uploadedAt: '2024-03-05T09:30:00Z',
    uploadedBy: 'admin-uuid-0001',
    url: '/mock-files/releve-notes.pdf',
  },
  {
    id: 'doc-003',
    name: 'Convocation_examens.pdf',
    type: 'PDF',
    size: 102400,              
    uploadedAt: '2024-03-10T14:00:00Z',
    uploadedBy: 'admin-uuid-0001',
    url: '/mock-files/convocation.pdf',
  },
  {
    id: 'doc-004',
    name: 'Photo_identite.jpg',
    type: 'IMAGE',
    size: 1048576,            
    uploadedAt: '2024-03-12T11:00:00Z',
    uploadedBy: 'basic-uuid-0002',
    url: '/mock-files/photo.jpg',
  },
];