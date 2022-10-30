import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  items?: Array<string>;
}

export default function AppSelectList(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <FormControl fullWidth error={Boolean(fieldState.error)}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items?.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
