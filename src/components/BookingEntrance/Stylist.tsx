/* eslint-disable @next/next/no-img-element */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';

import Loading from '../Loading';
import { ITeam } from '../Team/type';
import { BOOKING_COLLECTION, db } from '../../firebase/config';
import { IBookingItem } from '../../interface/pages/booking';
import { TEAM, TIME_LIST } from '../../utils/constants';
import { getTimeRange } from '../../utils/helper';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type IProps = {
  handleContinue: (payload: any) => void;
  title: string;
  marginTop: string;
  handleChangeDateTime?: (payload: any) => void;
  handleBackToBarberCallBack?: () => void;
  defaultDatetime?: {
    date: Date;
    time: number;
  };
};

const isAvailableToOrder = (
  bookingList: IBookingItem[],
  timeToCheck: number
) => {
  const filter = bookingList.filter(
    (booking: IBookingItem) => booking.datetime.time === timeToCheck
  );
  return filter.length < 2;
};

const Stylist = (props: IProps) => {
  const [barber, setBarber] = useState<ITeam | null>();
  const [datetime, setDatetime] = useState<{ time: number; date: Value }>({
    time: props?.defaultDatetime?.time || 0,
    date: props?.defaultDatetime?.date || new Date(),
  });

  const [timeSeries, setTimeSeries] = useState<number[]>([]);
  const [bookingList, setBookingList] = useState<IBookingItem[]>([]);

  const handleSelectTime = (time: number, isAvailable: boolean) => {
    if (isAvailable) {
      const newDateTime = {
        ...datetime,
        time,
      };
      setDatetime(newDateTime);
      if (props.handleChangeDateTime) {
        props.handleChangeDateTime({
          datetime: newDateTime,
          barber,
        });
      }
    }
  };

  const handleContinue = () => {
    if (!datetime.time || !datetime.date) {
      toast.error('Quý khách vui lòng chọn giờ cắt', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
      return;
    }
    const payload = {
      datetime,
      barber,
    };
    props.handleContinue(payload);
  };

  useEffect(() => {
    const currentTime = new Date().getHours();
    const element = document.getElementById(currentTime.toString());
    if (element) {
      const y = element?.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      setTimeSeries(TIME_LIST);
    }, 1000);
  }, []);

  const onChangeDate = (startDate: any) => {
    const newDateTime = {
      ...datetime,
      date: startDate,
    };
    setDatetime(newDateTime);

    if (barber?.name) {
      handleQueryBookingList(barber.name, startDate);
    }

    if (props.handleChangeDateTime) {
      props.handleChangeDateTime({
        datetime: newDateTime,
        barber,
      });
    }
  };

  const handleQueryBookingList = async (
    barberName: string,
    startDate?: Date
  ) => {
    if (!startDate) {
      startDate = new Date();
    }
    const colRef = collection(db, BOOKING_COLLECTION);
    startDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);

    const queryString = query(
      colRef,
      where('datetime.date', '>=', startDate),
      where('datetime.date', '<=', nextDate),
      where('barber.name', '==', barberName)
    );
    const docsSnap = await getDocs(queryString);
    const data: IBookingItem[] = [];
    docsSnap.forEach((doc) => {
      if (doc) {
        data.push(doc.data() as IBookingItem);
      }
    });
    setBookingList(data);
  };

  const handleSelectBarber = (item: ITeam) => {
    setBarber(item);
    if (item.name) {
      handleQueryBookingList(item.name);
    }
  };

  const handleBackToBarber = () => {
    setBarber(null);
    if (props.handleBackToBarberCallBack) {
      props.handleBackToBarberCallBack();
    }
  };

  return (
    <div className={`mt-[${props.marginTop}]`}>
      {!barber ? (
        <div className='container'>
          <h2 className='text-2lg'>{props.title}</h2>
          {TEAM.map((item) => (
            <div className='flex justify-between border-b py-3' key={item.id}>
              <div className='flex text-center items-center'>
                <Image
                  src={item?.square_photo || 'default.png'}
                  alt='avatar'
                  width='100'
                  height='100'
                  className='rounded-[6px] mr-3 object-cover'
                />
                <div className='align-left'>
                  <div className='text-lg text-black'>{item.name}</div>
                  <i className='text-sm'>{item.intro}</i>
                </div>
              </div>
              <div className='flex text-center align-middle'>
                <button
                  className='bg-[#9f6e0dd4] text-white px-4 py-2 rounded outline-none focus:outline-none m-auto select-btn-barber'
                  onClick={() => handleSelectBarber(item)}
                >
                  Chọn <span className='arrow_right'></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className='container'>
            <button
              className='flex mb-3 cursor-pointer bg-[#9f6e0dd4] p-1 rounded text-white back-other-barber'
              onClick={handleBackToBarber}
            >
              <ArrowBackIcon />
              <span className='text-md ml-2'>Chọn Barber khác</span>
            </button>
            <p>Đang hiển thị lịch đặt của {barber.name}</p>

            <Calendar
              onChange={onChangeDate}
              value={datetime.date}
              className='m-auto border-gray-200 rounded'
            />
            <div className='flex flex-wrap mb-[120px]'>
              {timeSeries.length > 0 ? (
                timeSeries.map((time) => {
                  const isAvailable = isAvailableToOrder(bookingList, time);
                  let bg = 'bg-stone-300';
                  if (datetime.time === time && isAvailable) {
                    bg = 'bg-[#9f6e0dd4] text-white';
                  } else if (isAvailable) {
                    bg = 'bg-white';
                  }

                  const timeText = getTimeRange(time);

                  return (
                    <div
                      className={`${
                        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
                      } p-1 w-1/3 md:w-1/6 h-[80px]`}
                      key={time}
                      onClick={() => handleSelectTime(time, isAvailable)}
                      id={time.toString()}
                    >
                      <div
                        className={`time-series-item rounded text-center w-100 h-100 flex text-base ${bg}`}
                      >
                        <div className='m-auto'>
                          <p className='m-0 leading-none'>{timeText}</p>
                          {!isAvailable && (
                            <span className='text-[12px]'>(Đã kín lịch)</span>
                          )}
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
          <div className='fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg'>
            <button
              className='text-white w-full sm:w-5/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={handleContinue}
            >
              ({moment(datetime.date?.toString()).format('DD/MM/YYYY')},{' '}
              <span className='lowercase'>{getTimeRange(datetime.time)})</span>{' '}
              Hoàn tất <span className='arrow_right'></span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Stylist;
