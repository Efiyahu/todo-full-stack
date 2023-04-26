import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect } from '@mui/material';
import styled from 'styled-components';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

interface Props extends SelectInputProps {
  data: string[];
  label: string;
}

const Select = React.forwardRef<HTMLDivElement, Props>(({ data, label }: Props) => (
  <Box sx={{ minWidth: 120 }}>
    <StyledFormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <StyledSelect labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
        {data?.map(item => (
          <MenuItem key={crypto.randomUUID()} value={item}>
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  </Box>
));

Select.displayName = 'Select';

export default Select;

const StyledSelect = styled(MuiSelect)`
  &.MuiInputBase-root {
    width: 280px;
    height: 48px;
    background-color: #292f3a;
    border-radius: 10px;
    color: #eee;
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
`;

const StyledFormControl = styled(FormControl)`
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
