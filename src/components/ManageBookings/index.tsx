/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scheduler } from '@aldabil/react-scheduler';
import type { ProcessedEvent } from '@aldabil/react-scheduler/types';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import BookingFilter from './BookingFilter';
import { IBooking } from '../BookingEntrance/types';
import { IService } from '../ManageServices';
import api from '../../utils/api';
import { STATUS } from '../../utils/constants';
import { addMinutes } from '../../utils/helper';

const ManageBookings = () => {
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [barbers, setBarbers] = useState([]);
  const [filter, setFilter] = useState({
    barber_id: '*',
    status: '*',
  });

  const queryBookings = async (params?: any) => {
    try {
      setLoading(true);
      const res = await api.get('/api/bookings', { params });
      const bookings = res.data.data;
      const eventsFormat = bookings.map((booking: IBooking) => {
        const start = new Date(booking.booking_time);
        const end = addMinutes(start, 30);
        return {
          event_id: booking.id,
          title: booking.guest.name,
          start,
          end,
          disabled: false,
          ...booking,
        };
      });
      setLoading(false);
      setEvents(eventsFormat);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryBarbers = async () => {
      try {
        const res = await api.get('/api/users?role=barber');
        setBarbers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    queryBarbers();
    queryBookings();
  }, []);

  const onFilterChange = ({
    barber_id,
    status,
  }: {
    barber_id: string;
    status: string;
  }) => {
    queryBookings({ status, barber_id });
    setFilter({ status, barber_id });
  };

  const handleDelete = async (bookingId: string): Promise<string> => {
    try {
      const res = await api.delete(`/api/bookings/${bookingId}`);
      if (res.status === 200) {
        queryBookings(filter);
      }
      throw new Error('Failed to delete booking');
    } catch (error) {
      console.error(error);
      return bookingId;
    }
  };

  const updateBookingStatus = async (event: any) => {
    try {
      const res = await api.put(`/api/bookings/${event.id}`, {
        id: event.id,
        barber_id: event.barber_id,
        guest_id: event.guest_id,
        status: event.status === STATUS.DONE ? STATUS.OPEN : STATUS.OPEN,
        booking_time: event.booking_time,
        service_ids: event.services.map((s: IService) => s.id),
      });
      if (res.status === 200) {
        queryBookings(filter);
      }
      throw new Error('Failed to delete booking');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BookingFilter
        barbers={barbers}
        filter={filter}
        onFilterChange={onFilterChange}
      />

      {!loading ? (
        <Scheduler
          events={events}
          view='week'
          day={null}
          hourFormat='24'
          onDelete={handleDelete}
          editable={false}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 8,
            endHour: 20,
            step: 30,
          }}
          viewerExtraComponent={(_, event) => {
            return (
              <div className='mt-2'>
                <Typography variant='body1'>
                  - Tên khách hàng: {event?.guest?.name}
                </Typography>
                <div>- SĐT: {event?.guest?.phone}</div>
                <div>- Chỉ định người cắt: {event?.barber?.name}</div>
                <div>
                  - Thời gian:{' '}
                  {moment(event?.booking_time).format('DD/MM/YYYY HH:mm')}
                </div>
                <div>
                  - Gói dịch vụ:{' '}
                  {event?.services
                    ?.map((s: IService) => `${s?.name}(${s?.price_text})`)
                    .join(', ')}
                </div>
                {event?.notes && <div>- Ghi chú: {event?.notes}</div>}
                <div className='mt-3 mb-3'>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => updateBookingStatus(event)}
                  >
                    {event?.status === STATUS?.DONE
                      ? 'Mở lại'
                      : 'Xác nhận cắt xong'}
                  </Button>
                </div>
              </div>
            );
          }}
          translations={{
            navigation: {
              month: 'Tháng',
              week: 'Tuần',
              day: 'Ngày',
              today: 'Hôm nay',
            },
            form: {
              addTitle: 'Thêm sự kiện',
              editTitle: 'Sửa sự kiện',
              confirm: 'Xác nhận',
              delete: 'Xóa',
              cancel: 'Hủy',
            },
            event: {
              title: 'Tên',
              start: 'Bắt đầu',
              end: 'Kết thúc',
              allDay: 'Cả ngày',
            },
            validation: {
              required: 'Bắt buộc',
              invalidEmail: 'Email không đúng',
              onlyNumbers: 'Chỉ có thể nhập số',
              min: 'Minimum {{min}} letters',
              max: 'Maximum {{max}} letters',
            },
            moreEvents: 'Thêm...',
            loading: 'Đang tải...',
          }}
        />
      ) : null}
    </div>
  );
};

export default ManageBookings;
