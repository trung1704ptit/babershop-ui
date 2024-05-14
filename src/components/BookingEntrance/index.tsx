import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Berbers from './Barbers';
import EntranceForm from './EntranceForm';
import Finish from './Finish';
import NameModal from './NameModal';
import ServicesList from './ServicesList';
import { IBookingEntrance, IServiceDataItem, IUserBooking } from './types';
import { ITeam } from '../Team/type';
import addData from '../../firebase/addData';
import { BOOKING_COLLECTION } from '../../firebase/config';
import api from '../../utils/api';
import { TEAM_EMAILS } from '../../utils/constants';
import { bookingEmailTemplate } from '../../utils/helper';

const Booking = (props: IBookingEntrance) => {
  const [user, setUser] = useState<IUserBooking>({
    id: '',
    phone: props.phone || '',
    name: props.name || '',
    services: [],
    datetime: {
      date: new Date(),
      time: 0,
    },
    notes: '',
    barber: null,
    status: 'open',
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.phone) {
      const phone: string = router.query.phone as string;

      const queryUserDetail = async () => {
        try {
          const res = await api.get(`/api/users/${phone}`);
          if (res && res.status == 200) {
            setUser((prev: IUserBooking) => ({
              ...prev,
              ...res.data.data,
            }));
          } else {
            setUser((prev: IUserBooking) => ({ ...prev, phone }));
          }
        } catch (error) {
          setUser((prev: IUserBooking) => ({ ...prev, phone }));
        }
      };
      queryUserDetail();
    }
  }, [router.query]);

  const handleStartBooking = (phone: string) => {
    try {
      if (!phone || (phone && phone?.length < 8)) {
        toast.error('Số điện thoại chưa hợp lệ, vui lòng thử lại', {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
        });
      } else {
        toast.dismiss();
        router.push(`/booking?phone=${phone}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectServices = (services: IServiceDataItem[]) => {
    setUser((prev) => ({ ...prev, services }));
  };

  const handleNameFilled = async (newName: string) => {
    try {
      const timestamp = new Date().getTime().toString();
      const res = await api.post('/api/auth/register', {
        name: newName,
        phone: user.phone,
        email: `guest-${new Date().getTime()}@gmail.com`,
        password: timestamp,
        passwordConfirm: timestamp,
        roles: ['guest'],
      });
      if (res && res.status == 201) {
        setUser((prev) => ({ ...prev, ...res.data.data.user }));
      }
    } catch (err) {
      console.log(err);
      setUser((prev) => ({ ...prev, name: newName }));
    }
    const url = new URL(window.location as any);
    url.searchParams.set('name', newName);
    window.history.pushState(null, '', url.toString());
  };

  const handleSelectBarberAndTime = (barberAndTime: {
    datetime: { date: Date; time: number };
    barber: ITeam;
  }) => {
    const newUser = { ...user, ...barberAndTime };
    setUser(newUser);

    const payload = {
      name: newUser.name,
      barber: {
        name: newUser.barber.name,
        color: newUser.barber.color,
      },
      datetime: newUser.datetime,
      notes: newUser.notes,
      phone: newUser.phone,
      services: newUser.services.map((item) => ({
        id: item.id,
        price: item.price,
        title: item.title,
        priceLabel: item.priceLabel,
      })),
      status: 'open',
    };

    addData(BOOKING_COLLECTION, new Date().getTime().toString(), payload);
    const emailTemplate = bookingEmailTemplate(payload);
    axios.post('/api/booking-notification', {
      from: 'support@roybarbershop.com',
      to:
        newUser.barber.email === TEAM_EMAILS.DINH_QUANG
          ? newUser.barber.email
          : [newUser.barber.email, TEAM_EMAILS.DINH_QUANG],
      subject: `Thông báo có lịch hẹn cắt tóc mới [${payload.name}]`,
      html: emailTemplate,
    });
  };

  console.log('user:', user);

  if (user.phone && !user.name) {
    return <NameModal handleContinue={handleNameFilled} phone={user.phone} />;
  }

  if (user.phone && user.name && !user.services.length) {
    return <ServicesList user={user} handleContinue={handleSelectServices} />;
  }

  if (user.services.length > 0 && !user.datetime.time) {
    return (
      <Berbers
        handleContinue={handleSelectBarberAndTime}
        title='Mời anh chọn Barber'
        marginTop='120px'
      />
    );
  }

  if (user.datetime.time) {
    return <Finish user={user} />;
  }

  return <EntranceForm handleStartBooking={handleStartBooking} />;
};

export default Booking;
