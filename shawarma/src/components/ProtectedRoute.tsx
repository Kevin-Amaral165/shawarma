import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  userRole: string | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userRole, children }) => {
  if (userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
