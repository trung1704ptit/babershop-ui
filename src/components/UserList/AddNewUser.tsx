/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

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
}

function AddNewUser(props: IProps) {
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

  const handleExit = () => {
    if (props.callbackExit) {
      props.callbackExit();
    } else {
      console.log('redirect back');
    }
  };

  return (
    <div className='ml-auto mr-auto mt-[100px] text-center max-w-sm'>
      <Typography variant='h5' gutterBottom className='mb-5'>
        Thêm mới khách hàng và tích điểm
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
        />
        <TextField
          id='outlined-basic'
          label='Số điện thoại'
          variant='outlined'
          className='w-full mb-3'
          type='number'
          required
          name='phone'
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className='w-full mb-3'
            label='Ngày sinh'
            onChange={handleDateChange}
            format='DD/MM/YYYY'
          />
        </LocalizationProvider>
        <TextField
          id='outlined-basic'
          label='Email (Nếu có)'
          variant='outlined'
          className='w-full mb-3'
          type='email'
          name='email'
          onChange={handleChange}
        />
        <Button
          variant='contained'
          className='w-100'
          size='large'
          type='submit'
          disabled={loading}
          startIcon={<PersonAddIcon />}
        >
          Thêm mới
        </Button>
        <Button
          variant='outlined'
          className='w-100 mt-2'
          size='large'
          onClick={handleExit}
          startIcon={<CloseIcon />}
        >
          Thoát
        </Button>
      </form>
    </div>
  );
}

export default AddNewUser;
