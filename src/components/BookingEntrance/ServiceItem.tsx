/* eslint-disable @next/next/no-img-element */
import { IServiceItem } from "./types";

const ServiceItem = (props: IServiceItem) => {

  const handleSelect = (id: string) => {
    props.handleSelect(id);
  }

  const isSelected = props.serviceSelected.includes(props.data.id)

  return (
    <div className="w-1/2 md:w-1/4 p-2 items-stretch h-auto">
      <div className="rounded-lg border border-gray-300 flex flex-col relative overflow-hidden h-100">
        <img src={props.data.previewImage} alt="service img" />
        <div className="p-2.5 flex flex-col justify-between h-100">
          <div>
            {props.data.todos.map((todo: string) => (
              <p className="flex items-baseline mb-2 text-gray-800" key={todo}>
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0 fill-blue-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3 "
                    viewBox="0 0 24 24"
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
            <button className={`text-black text-center mt-auto border py-1 w-full focus:outline-none rounded ${isSelected ? 'bg-emerald-500 text-white' : ''}`}
              onClick={() => handleSelect(props.data.id)}
            >
              {isSelected ? 'Đã chọn' : 'Chọn'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem;