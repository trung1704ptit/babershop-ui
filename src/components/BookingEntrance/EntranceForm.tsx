import { useRef } from "react";

interface IProps {
  handleStartBooking: (a: any) => void;
}

const EntranceForm = (props: IProps) => {
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      props.handleStartBooking(phoneRef);
    }
  }

  return (
    <div className="px-3 md:px-5 md:py-24 mx-auto flex text-gray-600 body-font relative" id="booking-box">
      <div className="max-w-sm bg-white rounded-lg p-8 md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md mx-auto">
        <h2 className="text-gray-900 text-xl font-semibold title-font">ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-4">Cắt xong trả tiền, hủy lịch thoải mái</p>
        <div className="relative mb-4">
          <input type="number" required ref={phoneRef} onKeyDown={handleKeyDown} maxLength={10} placeholder="Nhập SĐT để đặt lịch" name="phone" className="w-full bg-white rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button onClick={() => props.handleStartBooking(phoneRef)} className="text-white w-full border-0 py-2 px-6 focus:outline-none rounded text-lg bg-[#9f6e0dd4]">ĐẶT NGAY</button>
        <p className=" text-gray-500 mt-3 text-md">Hỗ trợ đặt lịch trực tiếp <span className='font-medium text-[#9f6e0dd4]'>0869.825.633</span></p>
      </div>
    </div >
  )
}

export default EntranceForm;