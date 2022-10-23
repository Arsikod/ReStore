import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  isAllowed: boolean;
}

export default function ProtectedRoute({ isAllowed, children }: ProtectedRouteProps) {
  const location = useLocation();

  return isAllowed ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
