/* eslint-disable unused-imports/no-unused-vars */
import moment from 'moment';
import { useEffect, useState } from 'react';

import AllBooking from './AllBooking';
import BasicDateRangePicker from './DateRangePicker';
import SummaryInfo from './SummaryInfo';
import { IDateRange } from './types';
import { IBooking } from '../BookingEntrance/types';
import api from '../../utils/api';

const Summary = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate(),
    key: 'selection',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const handleDateChange = (range: IDateRange) => {
    setDateRange(range);
    queryData(range.startDate, range.endDate);
  };

  useEffect(() => {
    queryData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const queryData = async (_startDate: Date, _endDate: Date) => {
    setLoading(true);
    try {
      const res = await api.get('/api/bookings');
      if (res && res.status == 200) {
        setBookings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='block sm:flex'>
        <BasicDateRangePicker
          handleDateChange={handleDateChange}
          defaultDateRange={dateRange}
        />
        <SummaryInfo bookings={bookings} />
      </div>
      <AllBooking bookings={bookings} loading={loading} />
    </div>
  );
};

export default Summary;
