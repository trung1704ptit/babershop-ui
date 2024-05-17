/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Button,
  Checkbox,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
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
import { size } from 'lodash';
import { ChangeEvent, forwardRef, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { IService, IUserData } from '.';
import { VisuallyHiddenInput } from './AddNewUser';
import api from '../../utils/api';
import { ROLES } from '../../utils/constants';
import { toISOString } from '../../utils/helper';

interface INewUserProps {
  name: string;
  phone: string;
  birthday?: string;
  email?: string;
  roles?: string[];
  photo?: string;
}

interface IProps {
  callbackExit: () => void;
  userData: IUserData;
  services?: IService[];
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
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [usePoints, setUsePoints] = useState(0);

  const [formData, setFormData] = useState<INewUserProps>({
    name: props.userData.name,
    email: props.userData.email,
    birthday: props.userData.birthday,
    phone: props.userData.phone,
    roles: props.userData.roles,
    photo: props.userData.photo,
  });

  const handleSubmitUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.birthday) {
      toast.error('Vui lòng điền thông tin ngày sinh');
      return;
    }

    if (size(formData.roles) == 0) {
      toast.error('Vui lòng chọn quyền cho user');
      return;
    }

    if (formData.phone.length < 8) {
      toast.error('Độ dài số điện thoại phải lớn hơn 8');
      return;
    }

    let photoPath = '';

    setLoadingUpdateUser(true);

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
      .put(`api/users/${props.userData.id}`, formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          toast.success('Cập nhật thông tin khách hàng thành công', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoadingUpdateUser(false);
        }
      })
      .catch((error) => {
        let errMsg = 'Đã có lỗi xảy ra, vui lòng thử lại.';
        if (axios.isAxiosError(error) && error?.response) {
          errMsg = error.response.data.message;
        }
        toast.error(errMsg, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
        setLoadingUpdateUser(false);
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
    setFormData((prevData) => ({
      ...prevData,
      birthday: toISOString(newdate.toString()),
    }));
  };

  const onSubmitUsePoints = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/points', {
        user_id: props.userData.id,
        use_points: usePoints,
      });
      toast.success('Sử dụng điểm thành công.', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau.', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setPhoto(selectedFile);
      }
    }
  };

  const handleRole = (checked: boolean, role: string) => {
    let roles = formData?.roles || [];
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

  const photoPreviewUrl = useMemo(() => {
    if (photo) return URL.createObjectURL(photo);
    else if (formData.photo && formData.photo != '-')
      return process.env.NEXT_PUBLIC_APP_API_PATH + '/api/' + formData.photo;
    return '';
  }, [photo, formData.photo]);

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
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant='h6'
            component='div'
            className='uppercase'
          >
            Cài đặt tài khoản
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='ml-auto mr-auto max-w-md p-2'>
        <form onSubmit={handleSubmitUpdateUserInfo} className='mt-20'>
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
              slotProps={{
                textField: { size: 'small' },
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
            Tải ảnh đại diện
            <VisuallyHiddenInput type='file' onChange={handleFileChange} />
          </Button>
          {photoPreviewUrl && photoPreviewUrl != '-' && (
            <span className='relative'>
              <img
                src={photoPreviewUrl}
                className='w-[30%] border-radius ml-2 mb-2'
                alt='preview img'
              />
              <CloseIcon
                className='cursor-pointer'
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    photo: '-',
                  }));
                  setPhoto(null);
                }}
              />
            </span>
          )}
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
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleRole(e.target.checked, ROLES.GUEST)}
                defaultChecked={props?.userData?.roles?.includes(ROLES.GUEST)}
              />
            }
            label='Khách'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleRole(e.target.checked, ROLES.BARBER)}
                defaultChecked={props?.userData?.roles?.includes(ROLES.BARBER)}
              />
            }
            label='Barber'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleRole(e.target.checked, ROLES.ADMIN)}
                defaultChecked={props?.userData?.roles?.includes(ROLES.ADMIN)}
              />
            }
            label='Quản trị'
          />
          <Button
            variant='contained'
            className='w-50'
            size='small'
            type='submit'
            disabled={loadingUpdateUser}
          >
            Cập nhật thông tin
          </Button>
        </form>
        <Divider className='mt-4' />

        {props.services && (
          <ServiceSection services={props.services} userData={props.userData} />
        )}

        <Divider className='mt-4 mb-4' />
        <MailBirthday userData={props.userData} />
        <Divider className='mt-4 mb-4' />

        <Typography variant='h6' gutterBottom className='mb-3 mt-6 uppercase'>
          Sử dụng điểm
        </Typography>
        <Typography variant='body2' className='w-full mb-2'>
          Số điểm hiện tại:{' '}
          <strong>
            {props?.userData?.points
              ? props?.userData?.points[props?.userData?.points?.length - 1]
                  ?.points
              : 0}
          </strong>
        </Typography>
        <Typography variant='body2' className='w-full italic mb-3'>
          Số điểm nhập vào không đươc lớn hơn số điểm hiện tại.
        </Typography>
        <form onSubmit={onSubmitUsePoints}>
          <Stack direction='row' gap={2}>
            <TextField
              id='outlined-basic'
              label='Điểm'
              variant='outlined'
              className='w-100'
              required
              size='small'
              name='use_points'
              type='number'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsePoints(parseInt(e.target.value))
              }
            />

            <Button
              variant='contained'
              className='w-100'
              size='small'
              type='submit'
              disabled={loadingUpdateUser}
            >
              Cập nhật điểm
            </Button>
          </Stack>
        </form>

        <Divider className='mt-4 mb-4' />

        <Button
          variant='outlined'
          className='w-100 mb-4'
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

interface IServiceSectionProps {
  services: IService[];
  userData: IUserData;
}

type SwitchStateType = {
  [key: string]: boolean;
};

const getDefaultChecked = (id: string, services?: IService[]) => {
  if (!services) return false;
  const service = services.find((item) => item.id === id);

  if (service) {
    return true;
  }
  return false;
};

const ServiceSection = (props: IServiceSectionProps) => {
  const [serviceChecked, setServicesChecked] = useState<SwitchStateType>({});

  const handleClearServiceHistory = async () => {
    try {
      const res = await api.delete(
        `/api/services/history/${props.userData.id}`
      );
      if (res?.status === 204) {
        toast.success(
          `Đã xóa lịch sử gói 10+2 của khách hàng ${props.userData.name}.`,
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại.', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const handleClearPointsHistory = async () => {
    try {
      const res = await api.delete(`/api/points/history/${props.userData.id}`);
      if (res?.status === 204) {
        toast.success(
          `Đã xóa lịch cắt tóc của khách hàng ${props.userData.name}.`,
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại.', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const onChangeService = (checked: boolean, id: string) => {
    setServicesChecked((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  const handleSave = async () => {
    Object.keys(serviceChecked).forEach(async (key: string) => {
      const val = serviceChecked[key];
      try {
        if (val) {
          await api.post('/api/services/user-service', {
            user_id: props.userData.id,
            service_id: key,
          });
        } else {
          await api.delete(
            `/api/services/user-service/${props.userData.id}_${key}`
          );
        }
        toast.success('Cập nhật dịch vụ thành công', {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      } catch (error) {
        console.log(error);
        toast.error(
          'Cập nhật dịch vụ không thành công, vui lòng thử lại sau.',
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          }
        );
      }
    });
  };

  if (!props.services) {
    return null;
  }

  return (
    <>
      <Typography variant='h6' gutterBottom className='mb-3 mt-6 uppercase'>
        Dịch vụ
      </Typography>
      <div className='text-left'>
        <div>
          {props?.services?.map((s: IService) => (
            <FormControlLabel
              key={s.id}
              control={
                <Switch
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeService(e.target.checked, s.id)
                  }
                  defaultChecked={getDefaultChecked(
                    s.id,
                    props.userData.services
                  )}
                />
              }
              label={s.name}
            />
          ))}
        </div>

        <Button
          variant='contained'
          className='w-50 mb-4'
          size='small'
          type='submit'
          onClick={handleSave}
        >
          Cập nhật dịch vụ
        </Button>

        <Stack direction='row' gap={1}>
          <Button
            variant='outlined'
            color='error'
            className='w-100 text-xs'
            size='small'
            onClick={handleClearServiceHistory}
            startIcon={<DeleteIcon />}
          >
            Xóa lịch sử gói 10+2
          </Button>

          <Button
            variant='outlined'
            className='w-100 text-xs'
            size='small'
            onClick={handleClearPointsHistory}
            color='error'
            startIcon={<DeleteIcon />}
          >
            Xóa lịch sử cắt tóc
          </Button>
        </Stack>
      </div>
    </>
  );
};

interface IMailBirthdayProps {
  userData: IUserData;
}

const MailBirthday = (props: IMailBirthdayProps) => {
  const [loading, setLoading] = useState(false);
  const handleSendRemind = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/reminds/birthday', {
        email: props.userData.email,
      });
      if (res && res.status == 200) {
        setLoading(false);
        toast.success('Gửi mail chúc mừng sinh nhật thành công.', {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại.', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <Typography variant='h6' gutterBottom className='mb-3 mt-6 uppercase'>
        GỬI MAIL CHÚC MỪNG SINH NHẬT
      </Typography>

      <Button
        variant='contained'
        className=''
        size='small'
        type='submit'
        disabled={loading}
        onClick={handleSendRemind}
        startIcon={<MailOutlineIcon />}
      >
        Gửi mail chúc sinh nhật
      </Button>
    </>
  );
};

export default UpdateUserInfo;
