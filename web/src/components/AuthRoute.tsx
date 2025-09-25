import { Navigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';

interface AuthRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
  fallbackPath = '/',
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
