/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EastIcon from '@mui/icons-material/East';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';

import Loading from '../Loading';
import { ITeam } from '../Team/type';
import { TIME_LIST } from '../../utils/constants';
import { toISOString } from '../../utils/helper';

type IProps = {
  onDoneCallback: (payload: any) => void;
  title: string;
  marginTop: string;
  handleChangeDateTime?: (payload: any) => void;
  handleBackToBarberCallBack?: () => void;
  defaultDatetime?: string;
  barbers: ITeam[];
};

const Barbers = (props: IProps) => {
  const [barber, setBarber] = useState<ITeam | null>();
  const [bookingTime, setBookingTime] = useState(
    toISOString(new Date().toString())
  );

  const handleSelectTime = (time: string) => {
    let newDatetime = bookingTime.split('T')[0];
    newDatetime = newDatetime + 'T' + time + ':00+07:00';
    setBookingTime(newDatetime);

    if (props.handleChangeDateTime) {
      props.handleChangeDateTime({
        datetime: newDatetime,
        barber,
      });
    }
  };

  const handleContinue = () => {
    if (!bookingTime || bookingTime.includes('00:00:00+07:00')) {
      toast.error('Quý khách vui lòng chọn ngày và giờ cắt', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      return;
    }
    const payload = {
      bookingTime,
      barber,
    };
    props.onDoneCallback(payload);
  };

  const onChangeDate = (val: any) => {
    setBookingTime(toISOString(val));
  };

  const handleSelectBarber = (item: ITeam) => {
    setBarber(item);
  };

  const handleBackToBarber = () => {
    setBarber(null);
    if (props.handleBackToBarberCallBack) {
      props.handleBackToBarberCallBack();
    }
  };

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const bookingDate = new Date(bookingTime).getDate();

  return (
    <div className={`mt-[${props.marginTop}]`}>
      {!barber ? (
        <div className='container'>
          <Typography variant='h5'>{props.title}</Typography>
          {props?.barbers?.map((item) => (
            <div className='flex justify-between border-b py-3' key={item.id}>
              <div className='flex text-center items-center'>
                <img
                  src={`${process.env.NEXT_PUBLIC_APP_API_PATH}/api/${item.photo}`}
                  alt='avatar'
                  width='100'
                  height='auto'
                  className='rounded-[6px] mr-3 object-cover'
                />
                <div className='align-left'>
                  <div className='text-lg text-black'>{item.name}</div>
                  <span className='text-sm'>{item.intro}</span>
                </div>
              </div>
              <div className='text-center align-middle flex'>
                <Button
                  className='m-auto'
                  variant='contained'
                  onClick={() => handleSelectBarber(item)}
                  endIcon={<EastIcon />}
                >
                  Chọn
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className='m-auto mb-[120px] max-w-[400px] p-1'>
            <Button
              onClick={handleBackToBarber}
              startIcon={<ArrowBackIcon />}
              variant='outlined'
              className='capitalize mb-2 m-[0.25rem]'
              size='small'
            >
              Chọn Barber khác
            </Button>
            <Typography variant='body1' className='mb-2 p-[0.25rem]'>
              Đang hiển thị lịch đặt của {barber.name}
            </Typography>

            <div className='max-w-[400px] w-100 mb-2 p-[0.25rem]'>
              <Calendar
                onChange={onChangeDate}
                value={moment(bookingTime).toString()}
                className='border-gray-200 rounded w-100'
              />
            </div>

            <div className='flex flex-wrap w-100 mb-[120px]'>
              {TIME_LIST.length > 0 ? (
                TIME_LIST.map((time: string) => {
                  let isAvailable = true;
                  const [hours, minutes] = time.split(':').map(Number);
                  if (bookingDate > currentTime.getDate()) {
                    isAvailable = true;
                  } else if (bookingDate < currentTime.getDate()) {
                    isAvailable = false;
                  } else if (
                    (hours && hours > currentHours) ||
                    (hours === currentHours &&
                      minutes &&
                      minutes >= currentMinutes)
                  ) {
                    isAvailable = true;
                  } else {
                    isAvailable = false;
                  }
                  let bg = 'bg-stone-300';

                  if (bookingTime.includes(time)) {
                    bg = 'bg-[#9f6e0dd4] text-white';
                  } else if (isAvailable) {
                    bg = 'bg-white';
                  }

                  return (
                    <div
                      className={`p-1 w-1/3 md:w-1/4 h-[80px] ${
                        isAvailable
                          ? 'cursor-pointer'
                          : 'pointer-events-none cursor-not-allowed'
                      }`}
                      key={time}
                      onClick={() => handleSelectTime(time)}
                      id={time}
                    >
                      <div
                        className={`time-series-item rounded text-center w-100 h-100 flex text-base ${bg}`}
                      >
                        <div className='m-auto'>
                          <p className='m-0 leading-none'>{time}</p>
                          {!isAvailable ? (
                            <span className='text-xs'>Ko khả dụng</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='w-100 h-20 flex text-center'>
                  <div className='m-auto'>
                    <Loading />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg border-top'>
            <Button
              className='w-full text-sm px-2 py-2 max-w-[400px]'
              type='button'
              variant='contained'
              onClick={handleContinue}
              endIcon={<EastIcon />}
            >
              {moment(bookingTime).format('DD/MM/YYYY HH:mm')}, Hoàn tất
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Barbers;
