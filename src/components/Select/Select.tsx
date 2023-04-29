import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect } from '@mui/material';
import styled from 'styled-components';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { TodoFormValues } from 'components/Modal/AddTodoModal';
import { StatusEnum, PriorityEnum } from 'utils/enums';
import { Priority, Status } from 'types';

interface Props extends SelectInputProps {
  data: string[];
  label: string;
  name: string;
  control?: Control<TodoFormValues, unknown>;
}

const Select = React.forwardRef<HTMLDivElement, Props>(({ data, label, name, control }: Props, ref) => (
  <Box sx={{ minWidth: 120 }}>
    <StyledFormControl fullWidth ref={ref}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control as unknown as Control<FieldValues>}
        render={({ field }) => (
          <StyledSelect
            {...field}
            labelId={`${name}-label`}
            id={name}
            label={label}
            value={field.value}
            defaultValue={data[0]}
          >
            {data?.map(item => (
              <MenuItem key={crypto.randomUUID()} value={item}>
                {label === 'Priority' ? PriorityEnum[item as Priority] : StatusEnum[item as Status]}
              </MenuItem>
            ))}
          </StyledSelect>
        )}
      />
    </StyledFormControl>
  </Box>
));

Select.displayName = 'Select';

export default Select;

const StyledSelect = styled(MuiSelect)`
  &.MuiInputBase-root {
    width: 280px;
    height: 48px;
    background-color: ${({ theme }) => theme.colors.primary.darkBlue};
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
