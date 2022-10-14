import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  RadioGroupProps,
} from '@mui/material';

interface IRadiouButtonGroup extends RadioGroupProps {
  options: Array<Record<string, string>>;
  selectedValue: string;
}

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: IRadiouButtonGroup) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
