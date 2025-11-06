import { DashboardContainer, WelcomeMessage } from './styles';

interface DashboardProps {
  role: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  return (
    <DashboardContainer>
      {role === 'admin' && <WelcomeMessage>Welcome Admin</WelcomeMessage>}
      {role === 'customer' && <WelcomeMessage>Welcome Customer</WelcomeMessage>}
    </DashboardContainer>
  );
};

export default Dashboard;
