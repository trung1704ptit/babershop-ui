import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

import NameModal from "./NameModal";
import ServicesList from './ServicesList';
import Stylist from './Stylist';
import { IBookingEntrance, IUserBooking } from "../../interface/components/bookingEntrance";

const Booking = (props: IBookingEntrance) => {
  const phoneRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<IUserBooking>({
    phone: props.phone,
    name: props.name,
    services: [],
    bookingTime: null,
    notes: null,
    barber: null
  })


  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.phone) {
      const phone: string = router.query.phone as string;
      setUser((prev: IUserBooking) => ({ ...prev, phone }))
    }
  }, [router.query])

  const handleStartBooking = () => {
    try {
      if (!phoneRef.current) {
        console.log('error')
      } else {
        const { value } = phoneRef.current;
        if (!value || (value && value?.length < 7)) {
          toast.error('Số điện thoại chưa hợp lệ, vui lòng thử lại', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true
          });
          phoneRef.current.focus()
        } else {
          toast.dismiss();
          router.push(`/booking?phone=${value}`)
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      handleStartBooking();
    }
  }

  const handleSelectServices = (services: string[]) => {
    setUser(prev => ({ ...prev, services }))
  }

  const handleNameFilled = (newName: string) => {
    setUser(prev => ({ ...prev, name: newName }))
    const url = new URL(window.location as any);
    url.searchParams.set('name', newName);
    window.history.pushState(null, '', url.toString());
  }

  if (user.phone && !user.name) {
    return <NameModal handleContinue={handleNameFilled} />
  }

  if (user.phone && user.name && !user.services.length) {
    return <ServicesList user={user} handleContinue={handleSelectServices} />
  }

  if (user.services.length > 0) {
    return (
      <Stylist />
    )
  }

  return (
    <div className="px-3 md:px-5 md:py-24 mx-auto flex text-gray-600 body-font relative" id="booking-box">
      <div className="max-w-sm bg-white rounded-lg p-8 md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md mx-auto">
        <h2 className="text-gray-900 text-xl font-semibold title-font">ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h2>
        <p className="leading-relaxed text-gray-600 text-md mb-4">Cắt xong trả tiền, hủy lịch thoải mái</p>
        <div className="relative mb-4">
          <input type="number" required ref={phoneRef} onKeyDown={handleKeyDown} placeholder="Nhập SDT để đặt lịch" name="phone" className="w-full bg-white rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button onClick={handleStartBooking} className="text-white w-full border-0 py-2 px-6 focus:outline-none rounded text-lg bg-[#9f6e0dd4]">ĐẶT NGAY</button>
        <p className=" text-gray-500 mt-3 text-md">Hỗ trợ đặt lịch trực tiếp <span className='font-medium text-[#9f6e0dd4]'>0869.825.633</span></p>
      </div>
    </div >
  )
}

export default Booking;