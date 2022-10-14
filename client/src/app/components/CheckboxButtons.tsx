import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';
import CheckboxSkeleton from './CheckboxSkeleton';

interface ICheckboxButtons {
  items: Array<string> | undefined;
  onChange: (items: Array<string>) => void;
  checked?: Array<string>;
}

export default function CheckboxButtons({ items, onChange, checked }: ICheckboxButtons) {
  const [checkedItems, setCheckedItems] = useState<Array<string>>(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);

    let newChecked: Array<string> = [];

    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter((item) => item !== value);
    }

    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  if (!items)
    return (
      <div>
        {[1, 2, 3, 4, 5].map((v) => (
          <CheckboxSkeleton key={v} />
        ))}
      </div>
    );

  return (
    <FormGroup>
      {items?.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
}
