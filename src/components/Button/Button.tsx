import { Button as MuiButton, ButtonProps } from '@mui/material';
import styled, { css } from 'styled-components';
import { ButtonVariant } from 'utils/enums';

type Variant = 'text' | 'outlined' | 'contained';

interface Props extends ButtonProps {
  text: string;
  loading?: boolean;
}

const Button = ({ text, variant = 'contained', ...props }: Props) => (
  <StyledButton variant={variant} {...props}>
    {text}
  </StyledButton>
);

export default Button;

const StyledButton = styled(MuiButton)<{ variant: Variant }>`
  &.MuiButtonBase-root {
    border-radius: 6px;
    padding: 5px 20px;
    transition: all 0.3s;

    ${({ variant }) =>
      variant === ButtonVariant.Contained
        ? css`
            background-color: ${({ theme }) => theme.colors.button.default};
            .MuiButton-startIcon,
            .MuiButton-endIcon {
              fill: ${({ theme }) => theme.colors.button.text};
              stroke: ${({ theme }) => theme.colors.button.text};
            }
            :hover {
              background-color: ${({ theme }) => theme.colors.button.hover};
            }
            :active {
              background-color: ${({ theme }) => theme.colors.button.active};
            }
          `
        : variant === ButtonVariant.Outlined
        ? css`
            ${TextButton}
            border: 1px solid ${({ theme }) => theme.colors.button.default};
            :hover {
              border: 1px solid ${({ theme }) => theme.colors.button.hover};
            }
            :active {
              border: 1px solid ${({ theme }) => theme.colors.button.active};
            }
          `
        : css`
            ${TextButton}
          `}
  }
`;

const TextButton = css`
  color: ${({ theme }) => theme.colors.button.default};
  .MuiButton-startIcon,
  .MuiButton-endIcon {
    fill: ${({ theme }) => theme.colors.button.default};
    stroke: ${({ theme }) => theme.colors.button.default};
  }
  :hover {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.opacity};
    .MuiButton-startIcon,
    .MuiButton-endIcon {
      fill: ${({ theme }) => theme.colors.button.text};
      stroke: ${({ theme }) => theme.colors.button.text};
    }
  }
  :active {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.opacity};
  }
`;
