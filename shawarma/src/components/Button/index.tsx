import { ButtonProps } from 'antd';
import { StyledButton } from './styles';

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
