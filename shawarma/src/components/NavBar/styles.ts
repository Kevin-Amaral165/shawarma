import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NavLinks = styled.div`
  a {
    margin-right: 1rem;
    text-decoration: none;
    color: #333;

    &:hover {
      color: #ff4b2b;
    }
  }
`;
