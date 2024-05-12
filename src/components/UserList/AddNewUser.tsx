/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { viVN } from '@mui/x-date-pickers/locales';
import { size } from 'lodash';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../utils/api';
import { MESSAGES, ROLES } from '../../utils/constants';

interface INewUserProps {
  name: string;
  phone: string;
  birthday: string;
  email?: string;
  password: string;
  passwordConfirm: string;
  roles: string[];
  intro: string;
  photo: string;
}

interface IProps {
  callbackExit: () => void;
}

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function AddNewUser(props: IProps) {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const timstamp = new Date().getTime().toString();

  const [formData, setFormData] = useState<INewUserProps>({
    name: '',
    email: '',
    birthday: '',
    phone: '',
    roles: [],
    photo: '',
    intro: '',
    password: timstamp,
    passwordConfirm: timstamp,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.email) {
      formData.email = `guest-${new Date().getTime()}@gmail.com`;
    }

    if (!formData.birthday) {
      toast.error('Vui lòng điền thông tin ngày sinh');
      return;
    }

    if (size(formData.roles) == 0) {
      toast.error('Vui lòng chọn quyền cho user');
      return;
    }
    let photoPath = '';

    setLoading(true);
    if (photo) {
      const formFile = new FormData();
      formFile.append('file', photo);
      try {
        const res = await api.post('api/files/single', formFile, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the Content-Type manually
          },
        });
        if (res && res.status == 200) {
          photoPath = res.data.data.filePath;
        }
      } catch (error) {
        console.log(error);
      }
    }
    formData.photo = photoPath;
    api
      .post('api/auth/register', formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          toast.success(MESSAGES.REGISTER_USER_SUCCESS_VI, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoading(false);
          props.callbackExit();
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

  const handleExit = () => {
    if (props.callbackExit) {
      props.callbackExit();
    } else {
      console.log('redirect back');
    }
  };

  const handleRole = (checked: boolean, role: string) => {
    let roles = formData.roles;
    if (checked) {
      roles = [...roles, role];
    } else {
      roles = roles.filter((item) => item !== role);
    }

    setFormData((prevData) => ({
      ...prevData,
      roles,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setPhoto(selectedFile);
      }
    }
  };

  return (
    <div className='ml-auto mr-auto text-left max-w-sm'>
      <Typography variant='h5' gutterBottom className='mb-5 uppercase'>
        Đăng ký thành viên
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

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            viVN.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            label='Ngày sinh'
            className='w-full mb-3'
            format='DD-MM-YYYY'
            onChange={(value: any) => {
              setFormData((prevData) => ({
                ...prevData,
                birthday: value.$d.toISOString(),
              }));
            }}
            slotProps={{
              textField: { size: 'medium' },
              field: {
                readOnly: true,
              },
            }}
          />
        </LocalizationProvider>

        <Button
          component='label'
          role={undefined}
          variant='outlined'
          size='small'
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className='mb-3'
        >
          Ảnh đại diện
          <VisuallyHiddenInput type='file' onChange={handleFileChange} />
        </Button>
        {photo && (
          <span className='relative'>
            <img
              src={URL.createObjectURL(photo)}
              className='w-[30%] border-radius ml-2 mb-2'
              alt='preview img'
            />
            <CloseIcon
              className='cursor-pointer'
              onClick={() => setPhoto(null)}
            />
          </span>
        )}

        <TextField
          id='outlined-basic'
          label='Email (Nếu có)'
          variant='outlined'
          className='w-full mb-3'
          type='email'
          name='email'
          onChange={handleChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleRole(e.target.checked, ROLES.GUEST)}
            />
          }
          label='Khách'
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleRole(e.target.checked, ROLES.BARBER)}
            />
          }
          label='Barber'
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleRole(e.target.checked, ROLES.ADMIN)}
            />
          }
          label='Quản trị'
        />

        {formData.roles.includes(ROLES.BARBER) && (
          <TextField
            id='outlined-basic'
            label='Giới thiệu về Barber'
            variant='outlined'
            className='w-full mb-3'
            placeholder='Ví dụ: Barber trung cấp'
            type='text'
            name='intro'
            onChange={handleChange}
          />
        )}

        {formData.roles.includes(ROLES.ADMIN) && (
          <>
            <TextField
              id='outlined-basic'
              label='Mật khẩu'
              variant='outlined'
              className='w-full mb-3'
              type='text'
              name='password'
              onChange={handleChange}
            />

            <TextField
              id='outlined-basic'
              label='Nhập lại mât khẩu'
              variant='outlined'
              className='w-full mb-3'
              type='text'
              name='passwordConfirm'
              onChange={handleChange}
            />
          </>
        )}

        <Stack direction='row' gap={2}>
          <Button
            variant='outlined'
            className='w-100'
            size='large'
            onClick={handleExit}
            startIcon={<CloseIcon />}
          >
            Thoát
          </Button>
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
        </Stack>
      </form>
    </div>
  );
}

export default AddNewUser;
