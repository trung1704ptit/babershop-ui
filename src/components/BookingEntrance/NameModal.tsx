import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { INameModal } from './types';

export default function NameModal(props: INameModal) {
  const [showModal, _] = React.useState(true);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onDoneCallback();
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const onDoneCallback = () => {
    try {
      if (!name) {
        toast.error('Qúy khách vui lòng điền tên hoặc nhấn Bỏ qua', {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      } else {
        props.onDoneCallback(name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    props.onDoneCallback('Guest');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            className='justify-center items-center flex bg-no-repeat bg-cover bg-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            style={{
              background: 'url("/img/slide-1.jpg")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='relative w-auto my-6 mx-auto max-w-2xl px-2 shadow-md'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between px-3 pt-3 pb-2 rounded-t'>
                  <Typography variant='h6'>Đặt lịch ROY Barber Shop</Typography>
                  <CloseIcon onClick={handleCancel} />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='relative px-3 py-2 md:p-10 flex-auto'>
                    <Typography variant='body1' className='mb-3'>
                      Anh cho chúng em biết tên để tiện xưng hô nhé!
                    </Typography>
                    <TextField
                      type='text'
                      required
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setName(e.target.value)}
                      label='Tên quý khách'
                      name='phone'
                      className='w-full'
                    />
                  </div>

                  <div className='flex items-center justify-end p-4 md:p-10 rounded-b'>
                    <Button
                      onClick={handleSkip}
                      variant='outlined'
                      className='mr-2'
                    >
                      Bỏ qua
                    </Button>
                    <Button
                      type='submit'
                      onClick={onDoneCallback}
                      variant='contained'
                    >
                      Tiếp tục
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
