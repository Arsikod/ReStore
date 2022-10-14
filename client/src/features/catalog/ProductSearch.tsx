import { TextField, TextFieldProps } from '@mui/material';

export default function ProductSearch(props: TextFieldProps) {
  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      onChange={props.onChange}
      value={props.value}
    />
  );
}
