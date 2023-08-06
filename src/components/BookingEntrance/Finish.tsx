import { useEffect } from "react"

import { getTimeRange } from "./Stylist"
import { IUserBooking } from "./types";

const Finish = ({ user }: { user: IUserBooking }) => {
  try {
    useEffect(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }, [])

    return (
      <div className="container mt-[100px] mb-[100px] text-center">
        <div className="border-0 rounded-lg  relative p-4">
          <h2 className="text-green-600 mb-4 text-3xl font-bold">Đặt lịch thành công!</h2>

          <p className="font-medium text-lg text-black">ROY Barber Shop xin gửi tới anh thông tin đặt lịch</p>
          <div className="mb-4 text-black text-lg flex flex-wrap">
            <div className="p-3 text-center justify-center flex flex-col items-center w-full md:w-[33.33%]"><img src="/img/user.png" alt="user" className="w-8 mb-3" /> {user.name} ({user.phone})</div>
            <div className="p-3 text-center justify-center flex flex-col items-center w-full md:w-[33.33%]"><img src="/img/barber_1.png" alt="barber1" className="w-8 mb-3" />  {user.services.map((s) => s.title).join(', ')}</div>
            <div className="p-3 text-center justify-center flex flex-col items-center w-full md:w-[33.33%]"><img src="/img/clock.png" alt="clock" className="w-8 mb-3" />  <span>{user.bookingTime.date.toLocaleDateString()} &nbsp; &nbsp;{getTimeRange(user.bookingTime.time)}</span></div>
          </div>

          <div className="text-black text-center border-t pt-4">
            <h3 className="font-bold">ROY BARBER SHOP - Tiệm tóc nam</h3>
            <p>783 Âu cơ, Phố Hồ, Thị xã Thuận Thành, Bắc Ninh</p>
            <p>hotline 0869.825.633</p>
          </div>
        </div>
        <br />
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6760926103216!2d106.0887220776703!3d21.045642530606973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a16e9219e70b%3A0x2948bcdba372700c!2sROY%20Barber%20Shop!5e0!3m2!1sen!2ssg!4v1691205084322!5m2!1sen!2ssg" width="100%" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    )
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default Finish