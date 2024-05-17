import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServiceItem from './ServiceItem';
import { IService, IServicesList } from './types';
import api from '../../utils/api';

export default function ServicesList(props: IServicesList) {
  const [serviceSelected, setServicesSelected] = useState<IService[]>([]);

  const [services, setServices] = useState<IService[]>([]);

  const onDoneCallback = () => {
    if (serviceSelected.length === 0) {
      toast.dismiss();
      toast.error('Quý khách chưa chọn dịch vụ nào!', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      window.scrollTo({
        top: 20,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      props.onDoneCallback(serviceSelected.map((item) => item.id));
    }
  };

  const handleSelect = (data: IService) => {
    let newSelected = serviceSelected;
    const isExist = serviceSelected.find((item) => item.id === data.id);
    if (isExist) {
      newSelected = serviceSelected.filter(
        (item: IService) => item.id !== data.id
      );
      setServicesSelected(newSelected);
    } else {
      newSelected = [...serviceSelected, data];
      setServicesSelected(newSelected);
    }
  };

  useEffect(() => {
    const queryServices = async () => {
      try {
        const res = await api.get('/api/services');
        if (res && res.status === 200) {
          setServices(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    queryServices();
  }, []);

  return (
    <>
      <div className='container mt-[100px]'>
        <div>
          <Typography className='mb-2' variant='h5'>
            <>
              Mời anh{' '}
              <span className='uppercase text-red-500'>
                {props.booking.guest?.name}
              </span>{' '}
              chọn dịch vụ
            </>
          </Typography>
        </div>

        <div className='relative flex flex-wrap -m-2 mt-2 mb-[100px] items-stretch'>
          {services.map((item) => (
            <ServiceItem
              key={item.id}
              data={item}
              handleSelect={handleSelect}
              serviceSelected={serviceSelected}
            />
          ))}
        </div>

        <div className='fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg border-top'>
          <Button
            className='text-white w-full sm:w-4/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
            type='button'
            variant='contained'
            onClick={onDoneCallback}
          >
            Chọn {serviceSelected.length > 0 ? serviceSelected.length : ''} dịch
            vụ <span className='arrow_right'></span>
          </Button>
        </div>
      </div>
    </>
  );
}
