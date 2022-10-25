import { FormControlLabel, Checkbox } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

export default function AppCheckbox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });
  console.log(props.disabled);

  return (
    <FormControlLabel
      control={<Checkbox {...field} color="secondary" checked={field.value} />}
      label={props.label}
      disabled={props.disabled}
    />
  );
}
