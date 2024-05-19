/* eslint-disable unused-imports/no-unused-vars */
import { useEffect, useState } from 'react';

import AllBooking from './AllBooking';
import Filters from './Filters';
import SummaryInfo from './SummaryInfo';
import { IBooking } from '../BookingEntrance/types';
import api from '../../utils/api';

const Summary = () => {
  const [monthFilter, setMonthFilter] = useState('*');
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    queryData(monthFilter);
  }, [monthFilter]);

  const queryData = async (month: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/bookings?month=${month}`);
      if (res && res.status == 200) {
        setBookings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await api.delete(`/api/bookings/${bookingId}`);
      queryData(monthFilter);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='w-full sm:w-2/5'>
        <Filters
          setMonthFilter={(month: string) => setMonthFilter(month)}
          monthFilter={monthFilter}
        />
        <SummaryInfo bookings={bookings} />
      </div>
      <AllBooking
        bookings={bookings}
        loading={loading}
        handleDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
};

export default Summary;
