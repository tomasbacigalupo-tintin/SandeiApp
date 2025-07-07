import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Obtiene el contexto de autenticación de forma segura.
 * Lanza un error descriptivo si el hook se usa fuera del `AuthProvider`.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

