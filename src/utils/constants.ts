import { IServiceDataItem } from "../components/BookingEntrance/types"
import { ITeam } from "../components/Team/type"

export const TIME_LIST = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21]

export const SERVICES: IServiceDataItem[] = [
  {
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


export const TEAM: ITeam[] = [
  {
    id: 1,
    name: 'Quang Nguyễn',
    position: '',
    description: '',
    square_avatar: '/img/barber1_square.png',
    avatar: '/img/barber1.png',
    color: '#50b500'
  },
  {
    id: 2,
    name: 'XXX',
    position: '',
    description: '',
    square_avatar: '/img/barber2_square.png',
    avatar: '/img/barber2.png',
    color: 'yeallow'
  },
  {
    id: 3,
    name: 'Đạt Trần',
    position: '',
    description: '',
    square_avatar: '/img/barber3_square.png',
    avatar: '/img/barber3.png',
    color: 'blue'
  }
]
