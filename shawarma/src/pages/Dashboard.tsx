import styled from 'styled-components';

interface DashboardProps {
  role: string;
}

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const WelcomeMessage = styled.h1`
  color: #333;
`;

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  return (
    <DashboardContainer>
      {role === 'admin' && <WelcomeMessage>Welcome Admin</WelcomeMessage>}
      {role === 'customer' && <WelcomeMessage>Welcome Customer</WelcomeMessage>}
    </DashboardContainer>
  );
};

export default Dashboard;
