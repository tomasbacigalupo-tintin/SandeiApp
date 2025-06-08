// Mock mínimo para evitar error de import
import { ReactNode } from 'react';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

