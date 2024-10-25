import { FormControl, InputAdornment, MenuItem, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export function CustomInput(props: TextFieldProps & ICustomSelectProps) {
    const inputStyles =  {
        "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
                borderColor: "transparent", 
  
            },
        },
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    }

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        // Format the value like currency
        if (props.currency) {
            value = value.replace(/\D/g, ""); // Remove non-digit characters
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
        }

        if (props.onChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props.onChange({ target: { name: props.name, value } } as any);
        }
    };

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        if (newValue && props.onChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props.onChange({ target: { name: props.name, value: newValue } } as any);
        }
    }

    return (
        <FormControl fullWidth sx={{borderRadius: 10}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" height="1.75rem" px={2}>
                <Typography variant="body2">{props.label}</Typography>
                {props.endAction}
            </Stack>
            {props.value instanceof dayjs || props.date ? 
                <DesktopDatePicker
                    value={props.value as dayjs.Dayjs}
                    onChange={handleDateChange}
                    sx={inputStyles}
                />
                : 
                <TextField
                    select={props.select}
                    name={props.name}
                    variant={props.variant || "outlined"}
                    value={props.value}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    sx={inputStyles}
                    slotProps={props.currency ? {
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                          ),
                        },
                      } : {}}
                >
                    {props.options?.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            }
        </ FormControl>
    )
}

interface ICustomSelectProps {
    options?: string[];
    endAction?: JSX.Element;
    type?: "select" | "text";
    currency?: boolean;
    date?: boolean
}