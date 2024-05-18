/* eslint-disable @typescript-eslint/no-explicit-any */
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import DynamicInput from './DynamicInput';
import SelectCategory from './SelectCategory';
import ServiceType from './ServiceType';
import api from '../../utils/api';
import { SERVICE_TYPES } from '../../utils/constants';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

interface INewUserProps {
  name: string;
  image: string;
  price: number;
  price_text: string;
  todos: string[];
  category: string;
  service_type: string;
  description?: string;
}

interface IProps {
  callbackExit: () => void;
}

function AddNewUser(props: IProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<INewUserProps>({
    name: '',
    image: 'default.png',
    price: 0.0,
    price_text: '',
    category: '',
    todos: [],
    service_type: SERVICE_TYPES.ONE_TIME,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    api
      .post('api/services', formData)
      .then((res) => {
        if (res?.data?.status === 'success') {
          toast.success('Thêm mới dịch vụ thành công', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoading(false);
          props.callbackExit();
        }
      })
      .catch(() => {
        toast.error('Thêm mới dịch vụ không thành công', {
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
      [name]: name == 'price' ? parseFloat(value) : value,
    }));
  };

  const handleExit = () => {
    if (props.callbackExit) {
      props.callbackExit();
    } else {
      console.log('redirect back');
    }
  };

  // const handleUploadImage = () => {
  //   // console.log(event.target.files[0]);
  // };

  // const onFileUpload = () => {
  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   // formData.append(
  //   //   'myFile',
  //   //   this.state.selectedFile,
  //   //   this.state.selectedFile.name
  //   // );

  //   // Request made to the backend api
  //   // Send formData object
  //   api.post('/api/uploadfile', formData);
  // };

  return (
    <div className='ml-auto mr-auto max-w-sm'>
      <Typography variant='h5' gutterBottom className='mb-3'>
        Thêm mới gói dịch vụ
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Tên dịch vụ'
          variant='outlined'
          className='w-full mb-3'
          required
          name='name'
          onChange={handleChange}
        />

        {/* <Button
          component='label'
          className='mb-3'
          size='large'
          role={undefined}
          variant='outlined'
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Tải lên hình ảnh
          <VisuallyHiddenInput type='file' onChange={handleUploadImage} />
        </Button> */}

        <TextField
          id='outlined-basic'
          label='Giá'
          variant='outlined'
          className='w-full mb-3'
          type='number'
          required
          name='price'
          onChange={handleChange}
        />

        <TextField
          id='outlined-basic'
          label='Giá viết tắt'
          variant='outlined'
          className='w-full mb-3'
          type='text'
          name='price_text'
          onChange={handleChange}
        />

        <ServiceType
          onSelectCallback={(val: string) => {
            setFormData((prevData) => ({
              ...prevData,
              service_type: val,
            }));
          }}
          serviceType={formData.service_type}
        />

        <SelectCategory
          handleCategoryChange={(category: string) => {
            setFormData((prevData) => ({
              ...prevData,
              category,
            }));
          }}
        />

        <DynamicInput
          handleChange={(todos: string[]) => {
            setFormData((prevData) => ({
              ...prevData,
              todos,
            }));
          }}
        />

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
            startIcon={<AddIcon />}
          >
            Thêm mới
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default AddNewUser;
