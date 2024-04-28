import { Button, TextField, Typography } from '@mui/material';
import { useRef } from 'react';

import { CONTACT } from '../../utils/constants';

interface IProps {
  handleStartBooking: (a: any) => void;
}

const EntranceForm = (props: IProps) => {
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      props.handleStartBooking(phoneRef);
    }
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
        <TextField
          type='number'
          required
          ref={phoneRef}
          onKeyDown={handleKeyDown}
          label='Nhập SĐT để đặt lịch'
          name='phone'
          size='medium'
          className='w-full mb-3'
        />
        <Button
          onClick={() => props.handleStartBooking(phoneRef)}
          variant='contained'
          size='large'
          className='w-full mb-4'
        >
          ĐẶT NGAY
        </Button>
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
