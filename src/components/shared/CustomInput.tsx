import { FormControl, InputAdornment, MenuItem, Stack, TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Search } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { isModeDark } from '../../store/slices/themeSlice';

export function CustomInput(props: TextFieldProps & ICustomSelectProps) {
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      border: useAppSelector(isModeDark) ? 1 : 0,
      position: 'relative',
      '& fieldset': {
        display: 'none',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 5,
        pointerEvents: 'none',
        zIndex: -1,
      },
      '&:hover::before': {
        borderColor: '#1976d2 !important', // Hover color with higher specificity
      },
      '&.Mui-focused::before': {
        borderColor: '#1976d2', // Focus color with higher specificity
      },
    },
    color: 'inherit',
    borderRadius: 5,
    marginTop: '1.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    '& .MuiInputLabel-root': {
      backgroundColor: 'inherit',
      color: 'inherit',
      padding: '0 4px',
    },
    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled': {
      top: -10, // Adjust this to move label up on focus or when filled
      left: 0,
      fontSize: '1rem',
      background: 'transparent',
    },
    ...props.sx,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // // Format the value like currency
    // if (props.currency) {
    //   value = formatCurrency(Number(value));
    // }

    if (props.onChange) {
      props.onChange({ target: { name: props.name, value } } as any);
    }
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue && props.onChange) {
      props.onChange({ target: { name: props.name, value: newValue } } as any);
    }
  };

  const getStartAdornment = () => {
    if (props.currency && props.value) {
      return <InputAdornment position='start'>$</InputAdornment>;
    }
    if (props.type === 'search') {
      return (
        <InputAdornment position='start'>
          <Search fontSize='small' color='info' sx={{ mr: 1 }} />
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <FormControl fullWidth sx={{ maxWidth: props.maxWidth }}>
      <Stack sx={{ position: 'absolute', top: 0, right: 0 }}>{props.endAction}</Stack>
      {props.value instanceof dayjs || props.date ? (
        <DatePicker
          value={
            props.value === ''
              ? null
              : props.value instanceof dayjs
                ? (props.value as dayjs.Dayjs)
                : dayjs(props.value as string) || null
          }
          onChange={handleDateChange}
          format='MM/DD/YYYY'
          slotProps={{
            textField: {
              label: props.label,
              required: props.required,
              error: props.error,
              size: props.size,
              sx: inputStyles,
            },
          }}
        />
      ) : (
        <TextField
          onKeyDown={props.onKeyDown}
          autoFocus={props.autoFocus}
          select={props.select}
          size={props.size}
          name={props.name}
          variant={props.variant || 'outlined'}
          value={props.value}
          onChange={handleChange}
          label={props.label}
          required={props.required}
          placeholder={props.placeholder}
          multiline={props.multiline}
          rows={props.rows || 3}
          sx={inputStyles}
          slotProps={{
            input: {
              startAdornment: getStartAdornment(),
            },
          }}
        >
          {props.options?.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    </FormControl>
  );
}

interface ICustomSelectProps {
  options?: string[];
  endAction?: JSX.Element;
  currency?: boolean;
  date?: boolean;
  maxWidth?: string;
}
