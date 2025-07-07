import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  return {
    user: { email: 'dev@sandei.app', name: 'Dev User' },
    token: 'mock-token',
    isAuthenticated: true,
    login: async () => {}, // nunca falla
    logout: () => {},
  };
}
