/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

import Loading from "../Loading";
import { ITeam } from "../Team/type";
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

const Stylist = (props: IProps) => {
  const [stylist, setStylist] = useState<ITeam>();
  const [dateTime, setDateTime] = useState<{ time: number, date: Value }>({
    time: 8,
    date: new Date()
  });

  const [timeSeries, setTimeSeries] = useState<number[]>([]);

  const handleSelectTime = (time: number) => {
    setDateTime(prev => ({ ...prev, time }));
  }

  const handleContinue = () => {
    props.handleContinue(dateTime)
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

  const handleSelectStylist = (item: ITeam) => {
    setStylist(item);
  }

  return (
    <div className="mt-[120px]">
      {
        !stylist ? <div className="container">
          <h2 className="text-2lg">Mời anh chọn Stylist</h2>
          {
            TEAM.map(item => (
              <div className="flex justify-between border-t py-3" key={item.id}>
                <div className="flex text-center items-center">
                  <img src={item.square_avatar} alt="avatar" className="rounded-full w-[100px] mr-3" />
                  <span className="text-lg">{item.name}</span>
                </div>
                <div className="flex text-center align-middle"><button className="bg-[#9f6e0dd4] text-white px-4 py-2 rounded outline-none focus:outline-none m-auto" onClick={() => handleSelectStylist(item)}>Chọn <span className="arrow_right"></span></button></div>
              </div>
            ))
          }
        </div> : <>
          <Calendar onChange={newDate => setDateTime(prev => ({ ...prev, date: newDate }))} value={dateTime.date} className="m-auto border-gray-200 rounded" />
          <div className="flex flex-wrap container mb-[120px]">
            {
              timeSeries.length > 0 ? timeSeries.map(time => {
                if (Number.isInteger(time)) {
                  return (
                    <div className="p-2 w-1/2 md:w-1/4 h-[100px]" key={time} onClick={() => handleSelectTime(time)} id={time.toString()}>
                      <div className={`border rounded cursor-pointer text-center w-100 h-100 flex text-base font-semibold ${dateTime.time === time ? "bg-[#9f6e0dd4] text-white" : ""}`}>
                        <span className="m-auto">{time}h:00 - {time}h:30</span>
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="p-2 w-1/2 md:w-1/4 h-[100px]" key={time} onClick={() => handleSelectTime(time)} id={time.toString()}>
                    <div className={`border rounded cursor-pointer text-center w-100 h-100 flex text-base font-semibold ${dateTime.time === time ? "bg-[#9f6e0dd4] text-white" : ""}`}>
                      <span className="m-auto">{time - 0.5}h:30 - {time + 0.5}h:00</span>
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
              ({dateTime.date?.toLocaleString()}, <span className="lowercase">{getTimeRange(dateTime.time)})</span> Hoàn tất <span className="arrow_right"></span>
            </button>
          </div>
        </>
      }
    </div >

  )
}

export default Stylist;