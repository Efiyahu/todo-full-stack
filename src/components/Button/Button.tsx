import { Button as MuiButton, ButtonProps } from '@mui/material';
import styled from 'styled-components';

interface Props extends ButtonProps {
  text: string;
}

const Button = ({ text, variant = 'contained' }: Props) => <StyledButton variant={variant}>{text}</StyledButton>;

export default Button;

const StyledButton = styled(MuiButton)`
  border-radius: 6px;
`;
