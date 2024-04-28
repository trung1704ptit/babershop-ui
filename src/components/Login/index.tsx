import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import api from '../../utils/api';
import { MESSAGES } from '../../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      setError('');

      try {
        const res = await api.post('api/auth/login', {
          email: email,
          password: password,
        });
        if (res && res?.data?.status == 'success') {
          window.location.href = '/quan-ly';
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error?.response &&
          error.response?.data?.message === MESSAGES.INALID_EMAIL_OR_PASSWORD_EN
        ) {
          setError(MESSAGES.INALID_EMAIL_OR_PASSWORD_VI);
        } else {
          setError('Đã xảy ra lỗi đăng nhập, vui lòng thử lại sau.');
        }
      }

      setLoading(false);
    }
  };

  return (
    <section className='dark:bg-gray-900 w-100 p-10'>
      <div className='flex flex-col items-center justify-center mx-auto mt-[80px] md:mt-0 md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <Typography variant='h4' className='text-center mb-5'>
              Đăng nhập
            </Typography>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <TextField
                id='outlined-basic'
                label='Email'
                className='w-100'
                size='medium'
                type='text'
                variant='outlined'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id='outlined-basic'
                label='Mật khẩu'
                className='w-100'
                size='medium'
                type='password'
                variant='outlined'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className='flex items-center justify-between'>
                <a
                  href='#'
                  className='text-sm font-medium text-[#9f6e0dd4] hover:underline dark:text-primary-500'
                >
                  Quên mật khẩu?
                </a>
              </div>

              {error && (
                <Typography variant='body2' color='red'>
                  {error}
                </Typography>
              )}

              <Button
                type='submit'
                disabled={loading}
                variant='contained'
                className='w-full'
                size='large'
              >
                Đăng nhập
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Chưa có tài khoản?{' '}
                <a
                  href='#'
                  className='font-medium text-[#9f6e0dd4] hover:underline'
                >
                  Đăng ký
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
