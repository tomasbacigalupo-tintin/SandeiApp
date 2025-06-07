import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '@/services/api';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('token');
    if (stored) setAuthToken(stored);
    return stored;
  });
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
    setAuthToken(res.data.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAuthToken(null);
  }, []);

  useEffect(() => {
    const handler = () => {
      logout();
      navigate('/login');
    };
    window.addEventListener('unauthorized', handler);
    return () => window.removeEventListener('unauthorized', handler);
  }, [logout, navigate]);

  const value = useMemo(
    () => ({ token, isAuthenticated: !!token, login, logout }),
    [token, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

