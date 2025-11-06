import { Link } from 'react-router-dom';
import Button from '../Button';
import { NavBarContainer, NavLinks } from './styles';

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavLinks>
        <Link to="/">Home</Link>
      </NavLinks>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </NavBarContainer>
  );
};

export default NavBar;
