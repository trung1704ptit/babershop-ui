import React, { useState } from "react";
import { toast } from "react-toastify";

import ServiceItem from "./ServiceItem";
import { IServiceDataItem, IServicesList } from "./types";

const mockServices: IServiceDataItem[] = [{
  id: '1',
  title: 'Cắt tóc',
  previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/793.jpg',
  price: '80k',
  todos: ['Cắt tóc hoàn hảo', 'Tư vấn cắt', 'Gội và vuốt tạo kiểu']
}, {
  id: '2',
  title: 'Cạo râu mặt',
  previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/625.jpg',
  price: '50k',
  todos: ['Phong cách BarberShop cổ điển thư giãn cùng khăn nóng kèm tinh dầu thơm']
},
{
  id: '3',
  title: 'Cạo đầu',
  previewImage: '/img/troc-dau.jpg',
  price: '50k',
  todos: ['Xuống tóc và thư giãn cùng khăn nóng kèm tinh dầu thơm']
},
{
  id: '4',
  title: 'Nối tóc DREADLOCK',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '2500-3000k',
  todos: ['Nối tóc DREADLOCK']
},
{
  id: '5',
  title: 'Uốn tóc',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '350k',
  todos: ['Uốn tạo kiểu giữ nếp cho mái tóc đẹp hơn']
},
{
  id: '6',
  title: 'Uốn PREMLOCK',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '500-800k',
  todos: ['Độc lạ cá tính']
},
{
  id: '7',
  title: 'Nhuộm màu thời trang',
  previewImage: '/img/nhuom-mau01.jpeg',
  price: '300k',
  todos: ['Thay đổi màu tóc thu hút ánh nhìn']
},
{
  id: '8',
  title: 'Nhuộm màu đen phủ bạc',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '150k',
  todos: ['Nhuộm màu đen phủ bạc']
},
{
  id: '9',
  title: 'LIGHT',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '100k',
  todos: ['LIGHT']
},
{
  id: '10',
  title: 'Tẩy tóc (1 lần)',
  previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
  price: '100k',
  todos: ['Tẩy tóc (1 lần)']
}
]

export default function ServicesList(props: IServicesList) {
  const [serviceSelected, setServicesSelected] = useState<string[]>([]);

  const handleContinue = () => {
    if (serviceSelected.length === 0) {
      toast.dismiss()
      toast.error('Quý khách chưa chọn dịch vụ nào!', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
      window.scrollTo({
        top: 20,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      props.handleContinue(serviceSelected);
    }
  }

  const handleSelect = (id: string) => {
    let newSelected = serviceSelected;
    if (serviceSelected.includes(id)) {
      newSelected = serviceSelected.filter((item: string) => item !== id);
      setServicesSelected(newSelected);
    } else {
      newSelected = [...serviceSelected, id];
      setServicesSelected(newSelected);
    }
    const url = new URL(window.location as any);
    url.searchParams.set('services', newSelected.join(','));
    window.history.pushState(null, '', url.toString());
  }

  return (
    <>
      <div className="container mt-[120px]">
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            {props.user.name !== 'Guest' ? <>Mời anh <span className="uppercase text-red-500">{props.user.name}</span> chọn dịch vụ</> : <>Mời quý khách chọn dịch vụ</>}
          </h3>
        </div>

        <div className="relative flex flex-wrap -m-2 mt-2 mb-[100px] items-stretch">
          {mockServices.map(item => (
            <ServiceItem key={item.id} data={item} handleSelect={handleSelect} serviceSelected={serviceSelected} />
          ))}
        </div>

        <div className="fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg">
          <button
            className="text-white w-full sm:w-4/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleContinue}
          >
            Chọn {serviceSelected.length > 0 ? serviceSelected.length : ''} dịch vụ <span className="arrow_right"></span>
          </button>
        </div>
      </div >
    </>
  );
}