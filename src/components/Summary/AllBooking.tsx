import moment from "moment";
import { useEffect, useState } from "react";

import Loading from "../Loading";
import { IBookingItem } from "../../interface/pages/booking";
import { getTimeRange } from "../../utils/helper";

type TProps = {
  bookingList: IBookingItem[],
  loading: boolean
}

const AllBooking = (props: TProps) => {
  const [list, setList] = useState<IBookingItem[]>([]);

  useEffect(() => {
    setList(props.bookingList);
  }, [props.bookingList])

  if (props.loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="mt-2 bg-white rounded">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2">
                Tên
              </th>
              <th scope="col" className="px-3 py-2">
                Số ĐT
              </th>
              <th scope="col" className="px-3 py-2">
                Dịch vụ
              </th>
              <th scope="col" className="px-3 py-2">
                Barber
              </th>
              <th scope="col" className="px-3 py-2">
                Thành tiền
              </th>
              <th scope="col" className="px-3 py-2">
                Thời gian
              </th>
              <th scope="col" className="px-3 py-2">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map(item => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </th>
                <td className="px-3 py-2">
                  {item.phone}
                </td>
                <td className="px-3 py-2">
                  {item.services?.map(s => `${s.title}(${s.price})`)}
                </td>
                <td className="px-3 py-2">
                  {item.barber.name}
                </td>
                <td className="px-3 py-2">
                  {/* {item?.services.reduce(
                    (accumulator, currentValue) => accumulator.price + currentValue,
                    10,
                  )} */}
                </td>
                <td className="px-3 py-2">
                  {moment(new Date(item.datetime.date.toDate().toDateString())).format('DD/MM/YYYY')} {getTimeRange(item.datetime.time)}
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AllBooking;