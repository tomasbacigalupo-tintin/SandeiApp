import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
