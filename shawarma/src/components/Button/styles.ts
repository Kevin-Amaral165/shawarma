import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(AntdButton)`
  border-radius: 8px;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;

  &:hover {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
    color: white;
  }
`;
