import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(AntdInput)`
  border-radius: 8px;
`;

const Input: React.FC = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
