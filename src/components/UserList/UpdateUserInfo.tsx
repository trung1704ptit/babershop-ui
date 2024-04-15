/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Stack, TextField, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, forwardRef, useState } from 'react';
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

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function UpdateUserInfo(props: IProps) {
  const [loading, setLoading] = useState(false);
  // const [checked, setChecked] = useState(true);

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
    <Dialog
      fullScreen
      open={true}
      onClose={props.callbackExit}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar variant='dense'>
          <IconButton
            edge='start'
            color='inherit'
            onClick={props.callbackExit}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Thông tin khách hàng
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='ml-auto mr-auto max-w-sm'>
        <form onSubmit={handleSubmit} className='mt-20'>
          <TextField
            id='outlined-basic'
            label='Tên khách hàng'
            variant='outlined'
            className='w-100 mb-3'
            required
            size='small'
            name='name'
            onChange={handleChange}
            defaultValue={props?.userData?.name}
          />
          <TextField
            id='outlined-basic'
            label='Số điện thoại'
            variant='outlined'
            className='w-100 mb-3'
            type='number'
            required
            size='small'
            name='phone'
            disabled
            defaultValue={props?.userData?.phone}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='w-100 mb-3'
              label='Ngày sinh'
              onChange={handleDateChange}
              format='DD/MM/YYYY'
              defaultValue={dayjs(props?.userData?.birthday || new Date())}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
          <TextField
            id='outlined-basic'
            label='Email (Nếu có)'
            variant='outlined'
            size='small'
            className='w-100 mb-3'
            type='email'
            name='email'
            defaultValue={props?.userData?.email}
            onChange={handleChange}
          />

          <Button
            variant='outlined'
            className='w-50'
            size='small'
            type='submit'
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            Cập nhật thông tin
          </Button>
        </form>
        <Divider className='mt-4' />

        <Typography variant='h6' gutterBottom className='mb-3 mt-6'>
          Dịch vụ
        </Typography>
        <div className='text-left'>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Gói cước 10+2'
            className='w-100'
          />
          <Button
            variant='outlined'
            className='w-50'
            size='small'
            type='submit'
            disabled={loading}
            startIcon={<SaveIcon />}
          >
            Cập nhật dịch vụ
          </Button>
        </div>

        <Divider className='mt-4' />

        <Typography variant='h6' gutterBottom className='mb-3 mt-6'>
          Sử dụng điểm
        </Typography>
        <Typography variant='body2' className='w-full mb-2'>
          Số điểm hiện tại: {props.userData?.points}
        </Typography>
        <Typography variant='body2' className='w-full italic mb-3'>
          Nhập vào số điểm để trừ đi. Số nhập vào phải nhỏ hơn số điểm hiện tại
        </Typography>
        <form>
          <Stack direction='row' gap={2}>
            <TextField
              id='outlined-basic'
              label='Điểm'
              variant='outlined'
              className='w-100'
              required
              size='small'
              name='name'
              type='number'
              onChange={handleChange}
              defaultValue={props?.userData?.name}
            />

            <Button
              variant='outlined'
              className='w-100'
              size='small'
              type='submit'
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              Cập nhật điểm
            </Button>
          </Stack>
        </form>

        <Divider className='mt-4 mb-4' />

        <Button
          variant='outlined'
          className='w-100'
          size='medium'
          onClick={props.callbackExit}
          startIcon={<CloseIcon />}
        >
          Thoát
        </Button>
      </div>
    </Dialog>
  );
}

export default UpdateUserInfo;
