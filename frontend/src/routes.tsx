
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages-AdminDashboard';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute userRole={user?.role}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
