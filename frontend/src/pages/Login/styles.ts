import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #ff4b2b, #ff416c);
`;

export const LoginForm = styled.form`
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

export const RegisterLink = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #333;

  a {
    color: #ff4b2b;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
