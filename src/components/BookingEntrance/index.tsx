/* eslint-disable unused-imports/no-unused-vars */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Berbers from './Barbers';
import EntranceForm from './EntranceForm';
import Finish from './Finish';
import NameModal from './NameModal';
import ServicesList from './ServicesList';
import { IBookingEntrance, IGuestBooking } from './types';
import { ITeam } from '../Team/type';
import api from '../../utils/api';
import { ROLES, TEAM_EMAILS } from '../../utils/constants';
import { bookingEmailTemplate, toISOString } from '../../utils/helper';

const Booking = (_: IBookingEntrance) => {
  const [barbers, setBarbers] = useState<ITeam[]>([]);
  const [booking, setBooking] = useState<IGuestBooking>({
    service_ids: [],
    booking_time: '',
    barber: null,
    guest: null,
    phone: '',
  });
  const [nextStep, setNextStep] = useState('start');
  const [bookingRes, setBookingRes] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.phone) {
      const phone: string = router.query.phone as string;

      const queryUserDetail = async () => {
        try {
          const res = await api.get(`/api/users/${phone}`);
          if (res && res.status == 200) {
            setBooking((prev: IGuestBooking) => ({
              ...prev,
              guest: res.data.data,
            }));
            setNextStep('services');
          } else {
            setBooking((prev: IGuestBooking) => ({ ...prev, phone }));
            setNextStep('name');
          }
        } catch (error) {
          setBooking((prev: IGuestBooking) => ({ ...prev, phone }));
          setNextStep('name');
        }
      };
      queryUserDetail();
    }

    if (router.query && router.query.step) {
      const step: string = router.query.step as string;
      setNextStep(step);
    }
  }, [router.query]);

  useEffect(() => {
    const queryBarbers = async () => {
      try {
        const res = await api.get('/api/users?role=barber');
        if (res.status === 200) {
          setBarbers(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    queryBarbers();
  }, []);

  const handleStartBooking = (phone: string) => {
    try {
      if (!phone || (phone && phone?.length < 8)) {
        toast.error('Số điện thoại chưa hợp lệ, vui lòng thử lại', {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      } else {
        toast.dismiss();
        router.push(`/dat-lich/chi-tiet?phone=${phone}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectServices = (service_ids: string[]) => {
    setBooking((prev) => ({ ...prev, service_ids }));
    setNextStep('barbers');
  };

  const handleNameFilled = async (newName: string) => {
    try {
      const timestamp = new Date().getTime().toString();
      const res = await api.post('/api/auth/register', {
        name: newName,
        phone: booking.phone,
        email: `guest-${new Date().getTime()}@gmail.com`,
        password: timestamp,
        passwordConfirm: timestamp,
        birthday: toISOString(new Date().toString()),
        roles: [ROLES.GUEST],
      });
      if (res && res.status == 201) {
        setBooking((prev) => ({ ...prev, guest: res.data.data.user }));
        setNextStep('services');
      }
    } catch (err) {
      console.log(err);
      setBooking((prev) => ({ ...prev, name: newName }));
    }

    router.push({
      query: { ...router.query, name: newName, step: 'services' },
    });
    setNextStep('services');
  };

  const handleSelectBarberAndTime = async ({
    barber,
    bookingTime,
  }: {
    barber: ITeam;
    bookingTime: string;
  }) => {
    try {
      const res = await api.post('/api/bookings', {
        guest_id: booking?.guest?.id,
        barber_id: barber.id,
        booking_time: bookingTime,
        service_ids: booking.service_ids,
      });

      if (res && res.status == 201) {
        setBookingRes(res.data.data);
        const to =
          barber.email === TEAM_EMAILS.DINH_QUANG
            ? [barber.email]
            : [barber.email, TEAM_EMAILS.DINH_QUANG];
        if (!res.data.data.guest.email.includes('guest')) {
          to.push(res.data.data.guest.email);
        }
        const emailTemplate = bookingEmailTemplate(res.data.data);
        axios.post('/api/booking-notification', {
          from: 'Roy Barber Shop <roybarbershop>',
          to: to,
          subject: `Thông báo có lịch hẹn cắt tóc mới`,
          html: emailTemplate,
        });
        setNextStep('finish');
      }
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại', {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  if (nextStep === 'name') {
    return <NameModal onDoneCallback={handleNameFilled} booking={booking} />;
  }

  if (nextStep === 'services') {
    return (
      <ServicesList booking={booking} onDoneCallback={handleSelectServices} />
    );
  }

  if (nextStep === 'barbers') {
    return (
      <Berbers
        onDoneCallback={handleSelectBarberAndTime}
        title='Mời anh chọn Barber'
        marginTop='100px'
        barbers={barbers}
      />
    );
  }

  if (nextStep === 'finish') {
    return <Finish bookingRes={bookingRes} />;
  }

  return <EntranceForm onDoneCallback={handleStartBooking} />;
};

export default Booking;
