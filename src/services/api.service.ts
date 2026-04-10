import axios from 'axios';
import { authService } from './auth.service';

// Axios instance — base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10000,              
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — fallback to mock data if backend
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const isNetworkError = !error.response;
    const isServerError =
      error.response?.status >= 500;

    if (isNetworkError || isServerError) {
      const url: string = error.config?.url ?? '';
      const mockData = await getMockFallback(url);

      if (mockData) {
        return {
          data: mockData,
          status: 200,
          statusText: 'OK (mock fallback)',
          headers: {},
          config: error.config,
        };
      }
    }

    return Promise.reject(error);
  }
);

// Mock fallback resolver
async function getMockFallback(url: string): Promise<unknown> {
  if (url.includes('/tickets')) {
    const { ticketsMock } = await import('./mock/tickets.mock');
    return ticketsMock;
  }

  if (url.includes('/documents')) {
    const { documentsMock } = await import('./mock/documents.mock');
    return documentsMock;
  }

  if (url.includes('/notifications')) {
    const { notificationsMock } = await import('./mock/notifications.mock');
    return notificationsMock;
  }

  // No mock found for this URL
  return null;
}

export default apiClient;