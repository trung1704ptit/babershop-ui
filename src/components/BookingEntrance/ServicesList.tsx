import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ServiceItem from './ServiceItem';
import { IServiceDataItem, IServicesList } from './types';
import { SERVICES } from '../../utils/constants';

export default function ServicesList(props: IServicesList) {
  const [serviceSelected, setServicesSelected] = useState<IServiceDataItem[]>(
    []
  );

  const handleContinue = () => {
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
      props.handleContinue(serviceSelected);
    }
  };

  const handleSelect = (data: IServiceDataItem) => {
    let newSelected = serviceSelected;
    const isExist = serviceSelected.find((item) => item.id === data.id);
    if (isExist) {
      newSelected = serviceSelected.filter(
        (item: IServiceDataItem) => item.id !== data.id
      );
      setServicesSelected(newSelected);
    } else {
      newSelected = [...serviceSelected, data];
      setServicesSelected(newSelected);
    }
    const url = new URL(window.location as any);
    url.searchParams.set(
      'services',
      newSelected.map((item) => item.id).join(',')
    );
    window.history.pushState(null, '', url.toString());
  };

  return (
    <>
      <div className='container mt-[120px]'>
        <div>
          <Typography className='mb-3' variant='h5'>
            {props.user.name !== 'Guest' ? (
              <>
                Mời anh{' '}
                <span className='uppercase text-red-500'>
                  {props.user.name}
                </span>{' '}
                chọn dịch vụ
              </>
            ) : (
              <>Mời quý khách chọn dịch vụ</>
            )}
          </Typography>
        </div>

        <div className='relative flex flex-wrap -m-2 mt-2 mb-[100px] items-stretch'>
          {SERVICES.map((item) => (
            <ServiceItem
              key={item.id}
              data={item}
              handleSelect={handleSelect}
              serviceSelected={serviceSelected}
            />
          ))}
        </div>

        <div className='fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg'>
          <Button
            className='text-white w-full sm:w-4/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
            type='button'
            variant='contained'
            onClick={handleContinue}
          >
            Chọn {serviceSelected.length > 0 ? serviceSelected.length : ''} dịch
            vụ <span className='arrow_right'></span>
          </Button>
        </div>
      </div>
    </>
  );
}
