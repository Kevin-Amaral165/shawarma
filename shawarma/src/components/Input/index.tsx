import { InputProps } from 'antd';
import { StyledInput } from './styles';

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
