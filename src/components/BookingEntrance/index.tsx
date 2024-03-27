import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import EntranceForm from './EntranceForm';
import Finish from './Finish';
import NameModal from './NameModal';
import ServicesList from './ServicesList';
import Stylist from './Stylist';
import { IBookingEntrance, IServiceDataItem, IUserBooking } from './types';
import { ITeam } from '../Team/type';
import addData from '../../firebase/addData';
import { BOOKING_COLLECTION } from '../../firebase/config';
import { TEAM_EMAILS } from '../../utils/constants';
import { bookingEmailTemplate } from '../../utils/helper';

const Booking = (props: IBookingEntrance) => {
  const [user, setUser] = useState<IUserBooking>({
    phone: props.phone,
    name: props.name,
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
      setUser((prev: IUserBooking) => ({ ...prev, phone }));
    }
  }, [router.query]);

  const handleStartBooking = (phoneRef: any) => {
    try {
      if (!phoneRef.current) {
        console.log('error');
      } else {
        const { value } = phoneRef.current;
        if (!value || (value && value?.length < 7)) {
          toast.error('Số điện thoại chưa hợp lệ, vui lòng thử lại', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
          });
          phoneRef.current.focus();
        } else {
          toast.dismiss();
          router.push(`/booking?phone=${value}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectServices = (services: IServiceDataItem[]) => {
    setUser((prev) => ({ ...prev, services }));
  };

  const handleNameFilled = (newName: string) => {
    setUser((prev) => ({ ...prev, name: newName }));
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

  if (user.phone && !user.name) {
    return <NameModal handleContinue={handleNameFilled} />;
  }

  if (user.phone && user.name && !user.services.length) {
    return <ServicesList user={user} handleContinue={handleSelectServices} />;
  }

  if (user.services.length > 0 && !user.datetime.time) {
    return (
      <Stylist
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
