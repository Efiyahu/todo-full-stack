import * as React from 'react';
import { StandardTextFieldProps, TextField } from '@mui/material';
import styled, { css } from 'styled-components';

interface Props extends StandardTextFieldProps {
  endIcon?: Element;
}

const Input = React.forwardRef<HTMLDivElement, Props>(({ label = 'text', multiline, ...props }: Props, ref) => (
  <StyledTextField {...props} variant="outlined" label={label} ref={ref} multiline={multiline ? true : false} />
));

Input.displayName = 'Input';

export default Input;

const StyledTextField = styled(TextField)<{ multiline: boolean }>`
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s !important;
  }
  &.MuiFormControl-root,
  .MuiInputBase-root {
    width: 280px;
    ${({ multiline }) =>
      !multiline
        ? css`
            height: 48px;
          `
        : null}
    background-color: ${({ theme }) => theme.colors.primary.darkBlue};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.primary.light};
    transition: all 1s;

    &:hover fieldset {
      border: 1px solid #7b849c;
    }
    &.Mui-focused fieldset {
      border: 1px solid gray;
    }
    &.Mui-error fieldset {
      border: 1px solid ${({ theme }) => theme.colors.primary.default};
    }
  }
  .MuiFormLabel-root {
    top: -3px;
    color: #7b849c;

    &.MuiInputLabel-shrink {
      color: #7b849c;

      &.Mui-error {
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }
`;
