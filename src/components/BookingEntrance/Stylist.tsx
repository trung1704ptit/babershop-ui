/* eslint-disable @next/next/no-img-element */
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

import Loading from "../Loading";
import { ITeam } from "../Team/type";
import { BOOKING_COLLECTION, db } from '../../firebase/config';
import { IBookingItem } from '../../interface/pages/booking';
import { TEAM, TIME_LIST } from "../../utils/constants";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type IProps = {
  handleContinue: (timeData: any) => void;
}

export const getTimeRange = (time: number) => {
  if (Number.isInteger(time)) {
    return `${time}h:00 - ${time}h:30`;
  }

  return `${time - 0.5}h:30 - ${time + 0.5}h:00`;
}

const isAvailableToOrder = (bookingList: IBookingItem[], timeToCheck: number) => {
  const filter = bookingList.filter((booking: IBookingItem) => booking.datetime.time === timeToCheck);
  return filter.length < 2;
}

const Stylist = (props: IProps) => {
  const [barber, setBarber] = useState<ITeam>();
  const [datetime, setDatetime] = useState<{ time: number, date: Value }>({
    time: 8,
    date: new Date()
  });

  const [timeSeries, setTimeSeries] = useState<number[]>([]);
  const [bookingList, setBookingList] = useState<IBookingItem[]>([])

  const handleSelectTime = (time: number, isAvailable: boolean) => {
    if (isAvailable) {
      setDatetime(prev => ({ ...prev, time }));
    }
  }

  const handleContinue = () => {
    const payload = {
      datetime,
      barber
    }
    props.handleContinue(payload)
  }

  useEffect(() => {
    const currentTime = new Date().getHours();
    const element = document.getElementById(currentTime.toString());
    if (element) {
      const y = element?.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth'
      });
    }
    setTimeout(() => {
      setTimeSeries(TIME_LIST)
    }, 1000)
  }, [])

  console.log('bookingList:', bookingList)

  const onChangeDate = (startDate: any) => {
    setDatetime(prev => ({ ...prev, date: startDate }))
    if (barber?.name) {
      handleQueryBookingList(barber.name, startDate);
    }
  }

  const handleQueryBookingList = async (barberName: string, startDate?: Date,) => {
    if (!startDate) {
      startDate = new Date();
    }
    const colRef = collection(db, BOOKING_COLLECTION);
    startDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(startDate)
    nextDate.setDate(startDate.getDate() + 1)
    nextDate.setHours(0, 0, 0, 0);

    const queryString = query(colRef, where("datetime.date", ">=", startDate), where("datetime.date", "<", nextDate), where("barber", "==", barberName))
    const docsSnap = await getDocs(queryString);
    const data: IBookingItem[] = [];
    docsSnap.forEach(doc => {
      if (doc) {
        data.push(doc.data() as IBookingItem);
      }
    })
    setBookingList(data);
  }

  const handleSelectBarber = (item: ITeam) => {
    setBarber(item);
    if (item.name) {
      handleQueryBookingList(item.name)
    }
  }

  return (
    <div className="mt-[120px]">
      {
        !barber ? <div className="container">
          <h2 className="text-2lg">Mời anh chọn Barber</h2>
          {
            TEAM.map(item => (
              <div className="flex justify-between border-t py-3" key={item.id}>
                <div className="flex text-center items-center">
                  <img src={item.square_avatar} alt="avatar" className="rounded-full w-[100px] mr-3" />
                  <span className="text-lg">{item.name}</span>
                </div>
                <div className="flex text-center align-middle"><button className="bg-[#9f6e0dd4] text-white px-4 py-2 rounded outline-none focus:outline-none m-auto" onClick={() => handleSelectBarber(item)}>Chọn <span className="arrow_right"></span></button></div>
              </div>
            ))
          }
        </div> : <>
          <Calendar onChange={onChangeDate} value={datetime.date} className="m-auto border-gray-200 rounded" />
          <div className="flex flex-wrap container mb-[120px]">
            {
              timeSeries.length > 0 ? timeSeries.map(time => {
                const isAvailable = isAvailableToOrder(bookingList, time);
                let bg = 'bg-stone-300';
                if (datetime.time === time && isAvailable) {
                  bg = 'bg-[#9f6e0dd4] text-white';
                } else if (isAvailable) {
                  bg = 'bg-white'
                }

                let text = `${time}h:00 - ${time}h:30`

                if (!Number.isInteger(time)) {
                  text = `${time - 0.5}h:30 - ${time + 0.5}h:00`
                }

                return (
                  <div className={`${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'} p-2 w-1/2 md:w-1/4 h-[100px]`} key={time} onClick={() => handleSelectTime(time, isAvailable)} id={time.toString()}>
                    <div className={`border rounded text-center w-100 h-100 flex text-base font-semibold ${bg}`}>
                      <span className="m-auto">{text}</span>
                    </div>
                  </div>
                )
              }) : <div className="w-100 h-20 flex text-center">
                <div className="m-auto"><Loading /></div>
              </div>
            }
          </div >
          <div className="fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg">
            <button
              className="text-white w-full sm:w-5/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleContinue}
            >
              ({moment(datetime.date?.toString()).format('DD/MM/YYYY')}, <span className="lowercase">{getTimeRange(datetime.time)})</span> Hoàn tất <span className="arrow_right"></span>
            </button>
          </div>
        </>
      }
    </div >

  )
}

export default Stylist;