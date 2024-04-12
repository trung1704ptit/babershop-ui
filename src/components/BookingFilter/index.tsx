import { useEffect, useState } from 'react';

import { TEAM } from '../../utils/constants';
import { getQueryValue } from '../../utils/helper';

const BookingFilter = () => {
  const [barber, setBarber] = useState('all');
  const [status, setStatus] = useState('open');

  const handleFilterBarber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBarber(event.target.value);
    const url = new URL(window.location.href);
    const search_params = url.searchParams;

    search_params.set('barber', event.target.value);

    url.search = search_params.toString();

    const new_url = url.toString();
    window.location.href = new_url;
  };

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    const url = new URL(window.location.href);
    const search_params = url.searchParams;

    search_params.set('status', event.target.value);

    url.search = search_params.toString();

    const new_url = url.toString();
    window.location.href = new_url;
  };

  useEffect(() => {
    const barber = getQueryValue('barber');
    if (barber) {
      setBarber(barber);
    }
    const status = getQueryValue('status');
    if (status) {
      setStatus(status);
    }
  }, []);

  return (
    <div className='mb-2 flex'>
      <div className='flex items-center mr-5'>
        <label
          htmlFor='barber-dropdown'
          className='block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Lọc theo Barber
        </label>
        <select
          id='barber-dropdown'
          onChange={handleFilterBarber}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={barber}
        >
          <option value='all'>Tất cả</option>
          {TEAM.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex items-center mr-5'>
        <label
          htmlFor='barber-dropdown'
          className='block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Lọc theo trạng thái
        </label>
        <select
          id='barber-dropdown'
          onChange={handleFilterStatus}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={status}
        >
          <option value='all'>Tất cả</option>
          <option value='done'>Đã hoàn thành</option>
          <option value='open'>Chưa hoàn thành</option>
        </select>
      </div>
    </div>
  );
};

export default BookingFilter;
