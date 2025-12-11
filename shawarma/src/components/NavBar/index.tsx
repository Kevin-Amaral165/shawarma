import { Link } from 'react-router-dom';
import Button from '../Button';
import { NavBarContainer, NavLinks } from './styles';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <NavBarContainer>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
        {user?.role === 'admin' && <Link to="/admin/dashboard">Dashboard</Link>}
      </NavLinks>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
