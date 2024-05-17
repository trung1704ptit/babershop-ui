import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { CONTACT } from '../../utils/constants';

interface IProps {
  onDoneCallback: (val: string) => void;
}

const EntranceForm = (props: IProps) => {
  const [phone, setPhone] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onDoneCallback(phone);
  };

  return (
    <div
      className='px-3 md:px-5 md:py-24 mx-auto flex text-gray-600 body-font relative'
      id='booking-box'
    >
      <div className='max-w-sm bg-white rounded-lg p-8 md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md mx-auto'>
        <Typography variant='h6' className='title-font mb-2 text-center'>
          ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY
        </Typography>
        <Typography variant='body1' className='mb-4 text-center'>
          Cắt xong trả tiền, hủy lịch thoải mái
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            type='number'
            required
            onChange={(e) => setPhone(e.target.value)}
            label='Nhập SĐT để đặt lịch'
            name='phone'
            size='medium'
            className='w-full mb-3'
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            className='w-full mb-4'
          >
            ĐẶT NGAY
          </Button>
        </form>

        <Typography variant='body1'>
          Hỗ trợ đặt lịch trực tiếp{' '}
          <span className='font-medium text-[#9f6e0dd4]'>
            <a href={`tel:${CONTACT.phoneVal}`}>{CONTACT.phoneText}</a>
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default EntranceForm;
