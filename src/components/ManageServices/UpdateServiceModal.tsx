/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, TextField, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { ChangeEvent, forwardRef, useState } from 'react';
import { toast } from 'react-toastify';

import { IService } from '.';
import DynamicInput from './DynamicInput';
import SelectCategory from './SelectCategory';
import ServiceType from './ServiceType';
import api from '../../utils/api';

interface IProps {
  callbackExit: () => void;
  serviceData: IService;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function ServiceDetail(props: IProps) {
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);

  const [formData, setFormData] = useState<IService>({
    name: props.serviceData.name,
    price: props.serviceData.price,
    price_text: props.serviceData.price_text,
    description: props.serviceData.description,
    image: props.serviceData.image,
    todos: props.serviceData.todos,
    category: props.serviceData.category,
    service_type: props.serviceData.service_type,
    created_at: props.serviceData.created_at,
    updated_at: props.serviceData.updated_at,
  });

  const handleSubmitServiceDetail = (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingUpdateUser(true);

    api
      .put(`api/services/${props.serviceData.id}`, formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          toast.success('Cập nhật dịch vụ thành công', {
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
            Cập nhật dịch vụ
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='ml-auto mr-auto max-w-sm'>
        <form onSubmit={handleSubmitServiceDetail} className='mt-20'>
          <TextField
            id='outlined-basic'
            label='Tên dịch vụ'
            variant='outlined'
            className='w-100 mb-3'
            required
            size='small'
            name='name'
            onChange={handleChange}
            defaultValue={props?.serviceData?.name}
          />
          <TextField
            id='outlined-basic'
            label='Giá'
            variant='outlined'
            className='w-100 mb-3'
            type='number'
            required
            size='small'
            name='price'
            defaultValue={props?.serviceData?.price}
            onChange={handleChange}
          />
          <TextField
            id='outlined-basic'
            label='Giá viết tắt'
            variant='outlined'
            className='w-100 mb-3'
            type='text'
            required
            size='small'
            name='price_text'
            defaultValue={props?.serviceData?.price_text}
            onChange={handleChange}
          />

          <TextField
            id='outlined-basic'
            label='Hình ảnh'
            variant='outlined'
            size='small'
            className='w-100 mb-3'
            type='text'
            name='image'
            defaultValue={props?.serviceData?.image}
            onChange={handleChange}
          />

          <ServiceType
            onSelectCallback={(val: string) => {
              setFormData((prevData) => ({
                ...prevData,
                service_type: val,
              }));
            }}
            serviceType={props.serviceData.service_type}
          />

          <SelectCategory
            handleCategoryChange={(category: string) => {
              setFormData((prevData) => ({
                ...prevData,
                category,
              }));
            }}
            category={props.serviceData.category}
          />

          <DynamicInput
            handleChange={(todos: string[]) => {
              setFormData((prevData) => ({
                ...prevData,
                todos,
              }));
            }}
            todos={props.serviceData.todos}
          />

          <Stack direction='row' gap={2}>
            <Button
              variant='contained'
              size='medium'
              className='w-full'
              type='submit'
              disabled={loadingUpdateUser}
            >
              Cập nhật
            </Button>
            <Button
              variant='outlined'
              size='medium'
              className='w-full'
              onClick={props.callbackExit}
              startIcon={<CloseIcon />}
            >
              Thoát
            </Button>
          </Stack>
        </form>
      </div>
    </Dialog>
  );
}

export default ServiceDetail;
