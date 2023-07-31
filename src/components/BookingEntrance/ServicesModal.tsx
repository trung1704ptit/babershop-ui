import React, { useRef } from "react";
import { toast, ToastContainer } from 'react-toastify';

import { INameModal } from "../../interface/components/bookingEntrance";

export default function NameModal(props: INameModal) {
  const [showModal, setShowModal] = React.useState(true);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enter')
    }
  }

  const handleCancel = () => {
    props.handleContinue(`Guest-${Date.now()}`)
  }

  const handleContinue = () => {
    try {
      if (!nameRef.current || !nameRef.current.value) {
        toast.error('Qúy khách vui lòng điền tên hoặc nhấn Bỏ qua', {
          position: toast.POSITION.TOP_LEFT
        });
        nameRef.current?.focus();
      } else {
        props.handleContinue(nameRef.current.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ background: 'url("/img/slide-1.jpg")' }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl px-2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-8 md:p-10 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold mb-0">
                    Mời anh chọn dịch vụ
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right absolute top-1 right-2 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-8 md:p-10 flex-auto">
                  <p className=" text-slate-500 text-lg leading-relaxed">
                    Anh cho chúng em biết tên để tiện xưng hô nhé!
                  </p>
                  <input type="text" required ref={nameRef} onKeyDown={handleKeyDown} placeholder="Tên anh là..." name="phone" className="w-full bg-white rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <div className="flex items-center justify-end p-8 md:p-10 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancel}
                  >
                    Bỏ qua
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleContinue}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <ToastContainer />
        </>
      ) : null}
    </>
  );
}