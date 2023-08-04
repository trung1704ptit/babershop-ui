/* eslint-disable @next/next/no-img-element */
import { toast } from "react-toastify";

import { IServiceItem } from "./types";

const ServiceItem = (props: IServiceItem) => {
  const isSelected = props.serviceSelected.includes(props.data.id)

  const handleSelect = (id: string) => {
    props.handleSelect(id);
    toast.dismiss();
    if (isSelected) {
      toast.success(`Đã bỏ ${props.data.title}`, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
    } else {
      toast.success(`Đã chọn ${props.data.title}`, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
    }
  }


  return (
    <div className="w-1/2 md:w-1/4 p-2 items-stretch h-auto">
      <div className="rounded-lg border border-gray-300 flex flex-col relative overflow-hidden h-100">
        <img src={props.data.previewImage} alt="service img" />
        <div className="p-2.5 flex flex-col justify-between h-100">
          <div>
            <h4 className="font-bold">{props.data.title}</h4>
            {props.data.todos.map((todo: string) => (
              <p className="flex items-baseline mb-2 text-gray-600" key={todo}>
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-[#9f6e0dd4] text-white rounded-full flex-shrink-0 fill-blue-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-2.5 h-2.5"
                    viewBox="0 0 22 22"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {todo}
              </p>
            ))}
          </div>
          <div>
            <p className="font-semibold text-black">{props.data.price}</p>
            <button className={`text-black text-center mt-auto border py-1 w-full focus:outline-none rounded ${isSelected ? 'bg-[#9f6e0dd4] text-white' : ''}`}
              onClick={() => handleSelect(props.data.id)}
            >
              {isSelected ? <span className="inline-flex items-center justify-center text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3.5 h-3 mr-1.5"
                  viewBox="0 0 26 26"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg><span>Đã chọn</span></span> : 'Chọn'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem;