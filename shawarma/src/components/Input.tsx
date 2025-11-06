import { Input as AntdInput, InputProps } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(AntdInput)`
  border-radius: 8px;
`;

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
