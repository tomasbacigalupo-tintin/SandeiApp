import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/context/useAuth';
import Spinner from '@/components/ui/spinner';
import { Toaster } from 'sonner';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Players = lazy(() => import('@/pages/Players'));
const Tactics = lazy(() => import('@/pages/Tactics'));
const Profile = lazy(() => import('@/pages/Profile'));
const Stats = lazy(() => import('@/pages/Stats'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner className="h-8 w-8 text-primary" />
  </div>
);

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-container">
      <Routes>
        {/* Redirección por defecto */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
        
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> :
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> :
              <Suspense fallback={<LoadingSpinner />}>
                <Register />
              </Suspense>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/players"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Players />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/tactics"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Tactics />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Stats />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        
        {/* 404 */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      
      {/* Navegación inferior solo si está autenticado */}
      {isAuthenticated && <BottomNav />}
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </div>
  );
}

export default App;
