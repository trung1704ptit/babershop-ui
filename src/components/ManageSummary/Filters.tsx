import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

interface IProps {
  setMonthFilter: (month: string) => void;
  monthFilter: string;
}

export default function Filters(props: IProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setMonthFilter(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 180, marginBottom: 2 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id='demo-simple-select-label'>Chọn tháng</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={props.monthFilter}
          label='Chọn tháng'
          onChange={handleChange}
        >
          <MenuItem value='*' key={0}>
            Tất cả
          </MenuItem>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(
            (month) => (
              <MenuItem value={month} key={month}>
                Tháng {month}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
