import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

import { SERVICE_TYPES } from '../../utils/constants';

interface IProps {
  onSelectCallback: (val: string) => void;
  serviceType?: string;
}

export default function ServiceType(props: IProps) {
  const [value, setValue] = React.useState(props.serviceType);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
    props.onSelectCallback(val);
  };

  return (
    <FormControl>
      <FormLabel id='demo-controlled-radio-buttons-group' className='mb-0'>
        Thời hạn dịch vụ
      </FormLabel>
      <RadioGroup
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value={SERVICE_TYPES.ONE_TIME}
          control={<Radio />}
          label='Sử dụng 1 lần'
        />
        <FormControlLabel
          value={SERVICE_TYPES.LONG_TIME}
          control={<Radio />}
          label='Dài dạn'
        />
      </RadioGroup>
    </FormControl>
  );
}
