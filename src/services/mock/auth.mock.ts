import type { AuthUser } from '../../contracts/api-contracts';

// Admin profile — has ALL permissions
export const adminUserMock: AuthUser = {
  sub: 'admin-uuid-0001',
  preferred_username: 'admin.user',
  email: 'admin@boaz-study.com',
  realm_access: {
    roles: ['AGENT', 'USER'],   
  },
  resource_access: {
    'studyportal-app': {
      roles: ['AGENT'],
    },
  },
  authorities: [
    'ticket:create',
    'ticket:read',
    'ticket:update',
    'ticket:comment',
    'document:upload',
    'document:read',
    'document:download',
    'notification:read',
  ],
  exp: 9999999999,             
};

// Basic user profile — limited permissions.
// Retirer `notification:read` des authorities pour masquer cloche + page notifications (profil USER sans centre notif).
export const basicUserMock: AuthUser = {
  sub: 'basic-uuid-0002',
  preferred_username: 'basic.user',
  email: 'basic@boaz-study.com',
  realm_access: {
    roles: ['USER'],
  },
  resource_access: {
    'studyportal-app': {
      roles: [],
    },
  },
  authorities: [
    'ticket:read',
    'document:read',
    'notification:read',
  ],
  exp: 9999999999,
};

export const mockProfiles: Record<string, AuthUser> = {
  admin: adminUserMock,
  basic: basicUserMock,
};