
// API CONTRACTS — Single source of truth for all data shapes


// Auth — structure of the JWT returned by Keycloak (or mocks)
export interface AuthUser {
  sub: string;                  
  preferred_username: string;  
  email: string;
  realm_access: {
    roles: string[];            
  };
  resource_access: {
    'studyportal-app': {
      roles: string[];
    };
  };
  authorities: string[];        
  exp: number;                 
}

// Ticket

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;            
  createdBy: string;            
}

// Document
export type DocumentType = 'PDF' | 'IMAGE' | 'WORD' | 'OTHER';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;                 
  uploadedAt: string;           
  uploadedBy: string;           
  url: string;                
}

// Notification
export type NotificationLevel = 'INFO' | 'WARNING' | 'ERROR';

export interface Notification {
  id: string;
  message: string;
  level: NotificationLevel;
  read: boolean;
  createdAt: string;       
}


// Generic API response wrapper — used for every API call

export interface ApiResponse<T> {
  data: T;
  message?: string;             
  success: boolean;
}