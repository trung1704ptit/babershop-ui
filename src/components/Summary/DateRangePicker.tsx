import { addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import { IDateRange } from './types';


type TProps = {
  handleDateChange: (dateRange: IDateRange) => void;
  defaultDateRange: IDateRange
}

const DateRangePickerComp = (props: TProps) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    if (props.defaultDateRange) {
      setState([props.defaultDateRange])
    }
  }, [props.defaultDateRange])

  const handleDateChange = (item: any) => {
    setState([item.selection])
    props.handleDateChange(item.selection)
  }

  return (<div className='bg-white p-2 rounded text-center'>
    <DateRangePicker
      onChange={handleDateChange}
      // showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
      locale={vi}
    />
  </div>)
}


export default DateRangePickerComp;
