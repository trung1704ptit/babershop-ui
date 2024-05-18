/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

import { IUserData } from '../UserList';
import { STATUS } from '../../utils/constants';

interface IProps {
  barbers: IUserData[];
  onFilterChange: (filter: any) => void;
  filter: {
    barber_id: string;
    status: string;
  };
}

const BookingFilter = (props: IProps) => {
  const handleFilterBarber = (event: SelectChangeEvent) => {
    props.onFilterChange({
      barber_id: event.target.value,
      status: props.filter.status,
    });
  };

  const handleFilterStatus = (event: SelectChangeEvent) => {
    props.onFilterChange({
      status: event.target.value,
      barber_id: props.filter.barber_id,
    });
  };

  return (
    <div className='mb-2 flex mt-3'>
      <div>
        <FormControl className='min-w-[200px] mr-2 mb-3' size='small'>
          <InputLabel id='demo-simple-select-label'>Barber</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={props.filter.barber_id}
            label='Chọn Barber'
            onChange={handleFilterBarber}
          >
            <MenuItem value='*' key='*'>
              Tất cả
            </MenuItem>
            {props.barbers.map((barber) => (
              <MenuItem value={barber.id} key={barber.id}>
                {barber.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className='min-w-[200px] mr-2 mb-3' size='small'>
          <InputLabel id='demo-simple-select-label'>Trạng thái</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={props.filter.status}
            label='Trạng thái'
            onChange={handleFilterStatus}
          >
            <MenuItem value='*' key='*'>
              Tất cả
            </MenuItem>
            <MenuItem value={STATUS.OPEN} key='open'>
              Open
            </MenuItem>
            <MenuItem value={STATUS.DONE} key='done'>
              Done
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default BookingFilter;
