/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { IUserData } from '.';
import { MESSAGES } from '../../utils/constants';

interface INewUserProps {
  name: string;
  phone: string;
  birthday: string;
  email?: string;
  password: string;
  passwordConfirm: string;
}

interface IProps {
  callbackExit: () => void;
  userData?: IUserData;
}

function UpdateUserInfo(props: IProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<INewUserProps>({
    name: '',
    email: '',
    birthday: '',
    phone: '',
    password: 'guest@babershop.com',
    passwordConfirm: 'guest@babershop.com',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.email) {
      formData.email = `${new Date().getTime()}@gmail.com`;
    }

    setLoading(true);
    axios
      .post(`http://localhost:8000/api/auth/register`, formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          toast.success(MESSAGES.REGISTER_USER_SUCCESS_VI, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        let errorMessage = MESSAGES.COMMON_ERROR_VI;
        if (
          error?.response?.data?.message == MESSAGES.REGISTER_USER_EXISTS_EN
        ) {
          errorMessage = MESSAGES.REGISTER_USER_EXISTS_VI;
        }

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });

        setLoading(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newdate: any) => {
    console.log(newdate);
    setFormData((prevData) => ({
      ...prevData,
      birthday: newdate.$d.toISOString(),
    }));
  };

  return (
    <div className='ml-auto mr-auto mt-[100px] text-center max-w-sm'>
      <Typography variant='h5' gutterBottom className='mb-5'>
        Cập nhật thông tin khách hàng
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Tên khách hàng'
          variant='outlined'
          className='w-full mb-3'
          required
          name='name'
          onChange={handleChange}
          defaultValue={props?.userData?.name}
        />
        <TextField
          id='outlined-basic'
          label='Số điện thoại'
          variant='outlined'
          className='w-full mb-3'
          type='number'
          required
          name='phone'
          defaultValue={props?.userData?.phone}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className='w-full mb-3'
            label='Ngày sinh'
            onChange={handleDateChange}
            format='DD/MM/YYYY'
            defaultValue={dayjs(props?.userData?.birthday || new Date())}
          />
        </LocalizationProvider>
        <TextField
          id='outlined-basic'
          label='Email (Nếu có)'
          variant='outlined'
          className='w-full mb-3'
          type='email'
          name='email'
          defaultValue={props?.userData?.email}
          onChange={handleChange}
        />
        <Button
          variant='contained'
          className='w-100'
          size='large'
          type='submit'
          disabled={loading}
        >
          Cập nhật
        </Button>
        <Button
          variant='outlined'
          className='w-100 mt-2'
          size='large'
          onClick={props.callbackExit}
        >
          Thoát
        </Button>
      </form>
    </div>
  );
}

export default UpdateUserInfo;
