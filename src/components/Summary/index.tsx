import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react"

import AllBooking from "./AllBooking"
import BasicDateRangePicker from "./DateRangePicker";
import SummaryInfo from "./SummaryInfo";
import { IDateRange } from "./types";
import { BOOKING_COLLECTION, db } from "../../firebase/config";
import { IBookingItem } from "../../interface/pages/booking";

const Summary = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate(),
    key: 'selection'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingList, setBookingList] = useState<IBookingItem[]>([])

  const handleDateChange = (range: IDateRange) => {
    setDateRange(range);
    queryData(range.startDate, range.endDate);
  }

  useEffect(() => {
    queryData(dateRange.startDate, dateRange.endDate)
  }, [dateRange])

  const queryData = (startDate: Date, endDate: Date) => {
    const dbRef = collection(db, BOOKING_COLLECTION);

    const args: [any, any, any] = [
      dbRef,
      where("datetime.date", ">=", startDate),
      where("datetime.date", "<", endDate)
    ]

    // if (barberFilter && barberFilter !== 'all') {
    //   args.push(where('barber.name', "==", barberFilter))
    // }
    // if (statusFitler && statusFitler !== 'all') {
    //   args.push(where('status', "==", statusFitler))
    // }

    const queryString = query(...args)

    const updatedData: IBookingItem[] = [];
    onSnapshot(queryString, qSnapshot => {
      setLoading(true);
      qSnapshot.forEach((doc: any) => {
        const docData = doc.data();
        updatedData.push({ id: doc.id, ...docData })
      })

      setBookingList(updatedData)

      setLoading(false);
    })
  }

  return (
    <div>
      <div className="block sm:flex">
        <BasicDateRangePicker handleDateChange={handleDateChange} defaultDateRange={dateRange} />
        <SummaryInfo bookingList={bookingList} />
      </div>
      <AllBooking bookingList={bookingList} loading={loading} />
    </div>
  )
}

export default Summary;