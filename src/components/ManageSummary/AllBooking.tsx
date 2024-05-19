import { Button } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { IBooking } from '../BookingEntrance/types';
import Loading from '../Loading';

type TProps = {
  bookings: IBooking[];
  loading: boolean;
  handleDeleteBooking: (id: string) => void;
};

const AllBooking = (props: TProps) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    setBookings(props.bookings);
  }, [props.bookings]);

  if (props.loading) {
    return <Loading />;
  }

  return (
    <div className='mt-2 bg-white rounded'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase border-bottom  dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-3 py-2'>
                Tên
              </th>
              <th scope='col' className='px-3 py-2'>
                Số ĐT
              </th>
              <th scope='col' className='px-3 py-2'>
                Dịch vụ
              </th>
              <th scope='col' className='px-3 py-2'>
                Barber
              </th>
              <th scope='col' className='px-3 py-2'>
                Thành tiền
              </th>
              <th scope='col' className='px-3 py-2'>
                Thời gian tạo
              </th>
              <th scope='col' className='px-3 py-2'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr
                key={booking.id}
                className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {booking.guest.name}
                </th>
                <td className='px-3 py-2'>{booking.guest.phone}</td>
                <td className='px-3 py-2'>
                  {booking?.services?.map((s) => `${s.name}(${s.price_text})`)}
                </td>
                <td className='px-3 py-2'>{booking.barber.name}</td>
                <td className='px-3 py-2'>
                  {booking?.services?.reduce(
                    (acc, current) => acc + current.price,
                    0
                  )}
                </td>
                <td className='px-3 py-2'>
                  {moment(booking.created_at).format('DD/MM/YYYY HH:mm')}
                </td>

                <td className='px-3 py-2'>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => props.handleDeleteBooking(booking.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooking;
