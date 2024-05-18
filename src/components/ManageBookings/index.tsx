import { Scheduler } from '@aldabil/react-scheduler';
import type { ProcessedEvent } from '@aldabil/react-scheduler/types';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import BookingFilter from './BookingFilter';
import { IBooking, IGuestBooking } from '../BookingEntrance/types';
import Loading from '../Loading';
import { IService } from '../ManageServices';
import api from '../../utils/api';
import { STATUS } from '../../utils/constants';
import { addMinutes } from '../../utils/helper';

const ManageBookings = () => {
  const [bookingList, setBookingList] = useState<IGuestBooking[]>([]);
  const [events, setEvents] = useState<ProcessedEvent[]>([]);

  const [loading, setLoading] = useState(true);
  const [barbers, setBarbers] = useState([]);

  const queryBookings = async (params?: any) => {
    try {
      const res = await api.get('/api/bookings', {
        params,
      });
      setBookingList(res.data.data);
      const eventsFormat = res.data.data.map((booking: IBooking) => {
        return {
          event_id: booking.id,
          ...booking,
          start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
          end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
          disabled: false,
        };
      });
      setEvents(eventsFormat);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const queryBarbers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/users?role=barber');
        setBarbers(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    queryBarbers();
    queryBookings();
  }, []);

  const onFilterChange = ({
    barberId,
    status,
  }: {
    barberId: string;
    status: string;
  }) => {
    queryBookings({ status, barber_id: barberId });
  };

  const handleDelete = async (bookingId: string): Promise<string> => {
    return new Promise((res, _) => {
      try {
        api.delete(`/api/bookings/${bookingId}`).then((r) => {
          if (r.status == 200) {
            res(bookingId);
          }
        });
      } catch (error) {
        console.log(error);
        res(bookingId);
      }
    });
  };

  const fetchRemote = async (): Promise<ProcessedEvent[]> => {
    return new Promise((resolve) => {
      api.get('/api/bookings').then((res) => {
        const eventsFormat = res.data.data.map((booking: IBooking) => {
          const start = new Date(booking.booking_time);
          const end = addMinutes(start, 30);

          console.log(start, end);
          return {
            event_id: booking.id,
            ...booking,
            start,
            end,
            disabled: false,
          };
        });
        resolve(eventsFormat);
      });
    });
  };

  if (loading) {
    return (
      <div className='w-full h-[400px] flex'>
        <div className='m-auto'>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <BookingFilter barbers={barbers} onFilterChange={onFilterChange} />

      <Scheduler
        events={events}
        view='week'
        day={null}
        hourFormat='24'
        getRemoteEvents={fetchRemote}
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
                - Tên khách hàng: {event.guest.name}
              </Typography>
              <div>- SĐT: {event.guest.phone}</div>
              <div>- Chỉ định người cắt: {event.barber.name}</div>
              <div>
                - Thời gian:{' '}
                {moment(event.booking_time).format('DD/MM/YYYY HH:mm')}
              </div>
              <div>
                - Gói dịch vụ:{' '}
                {event?.services
                  ?.map((s: IService) => `${s.name}(${s.price_text})`)
                  .join(', ')}
              </div>
              {event.notes && <div>- Ghi chú: {event.notes}</div>}

              <div className='mt-3 mb-3'>
                <Button variant='contained' size='small'>
                  {event.status === STATUS.DONE
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
    </div>
  );
};

export default ManageBookings;
