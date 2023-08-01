import React from "react";

import ServiceItem from "./ServiceItem";
import { IServiceItem } from "./types";
import { IUserBooking } from "../../interface/components/bookingEntrance";

const mockServices: IServiceItem[] = [{
  id: 1,
  title: 'Cắt tóc',
  previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/793.jpg',
  price: '80k',
  todos: ['Cắt tóc hoàn hảo', 'Tư vấn cắt', 'Gội và vuốt tạo kiểu']
}, {
  id: 2,
  title: 'Cạo râu mặt',
  previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/625.jpg',
  price: '50k',
  todos: ['Phong cách BarberShop cổ điển thư giãn cùng khăn nóng kèm tinh dầu thơm']
},
{
  id: 3,
  title: 'Cạo đầu',
  previewImage: '/img/troc-dau.jpg',
  price: '50k',
  todos: ['Xuống tóc và thư giãn cùng khăn nóng kèm tinh dầu thơm']
},
{
  id: 4,
  title: 'Nối tóc DREADLOCK',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '2500-3000k',
  todos: ['Nối tóc DREADLOCK']
},
{
  id: 5,
  title: 'Uốn tóc',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '350k',
  todos: ['Uốn tạo kiểu giữ nếp cho mái tóc đẹp hơn']
},
{
  id: 6,
  title: 'Uốn PREMLOCK',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '500-800k',
  todos: ['Độc lạ cá tính']
},
{
  id: 7,
  title: 'Nhuộm màu thời trang',
  previewImage: '/img/nhuom-mau01.jpeg',
  price: '300k',
  todos: ['Thay đổi màu tóc thu hút ánh nhìn']
},
{
  id: 8,
  title: 'Nhuộm màu đen phủ bạc',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '150k',
  todos: ['Nhuộm màu đen phủ bạc']
},
{
  id: 9,
  title: 'LIGHT',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '100k',
  todos: ['LIGHT']
},
{
  id: 10,
  title: 'Tẩy tóc (1 lần)',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '100k',
  todos: ['Tẩy tóc (1 lần)']
}
]

export default function ServicesModal(props: { user: IUserBooking }) {

  const handleCancel = () => {
    location.reload();
  }


  return (
    <>
      <div className="container mt-[120px]">
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            Mời anh <span className="uppercase text-red-500">{props.user.name}</span> chọn dịch vụ
          </h3>
        </div>

        <div className="relative flex flex-wrap -m-2 my-2 mb-3 items-stretch">
          {mockServices.map(item => (
            <ServiceItem key={item.id} {...item} />
          ))}
        </div>

        <div className="flex items-center justify-end rounded-b mb-5">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 mr-2 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleCancel}
          >
            Bỏ qua
          </button>
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
}