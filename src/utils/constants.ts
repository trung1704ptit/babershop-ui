import { IServiceDataItem } from "../components/BookingEntrance/types"
import { ITeam } from "../components/Team/type"

export const TIME_LIST = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20]

export const SERVICES: IServiceDataItem[] = [
  {
    id: '1',
    title: 'Cắt tóc',
    previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/793.jpg',
    price: '80k',
    priceLabel: '80k',
    todos: ['Cắt tóc hoàn hảo', 'Tư vấn cắt', 'Gội và vuốt tạo kiểu'],
    category: 'Dịch vụ cắt tỉa'
  }, {
    id: '2',
    title: 'Cạo râu mặt',
    previewImage: 'https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/625.jpg',
    price: '50k',
    priceLabel: '50k',
    todos: ['Phong cách BarberShop cổ điển thư giãn cùng khăn nóng kèm tinh dầu thơm'],
    category: 'Dịch vụ cắt tỉa'
  },
  {
    id: '3',
    title: 'Cạo đầu',
    previewImage: '/img/troc-dau.jpg',
    price: '50k',
    priceLabel: '50k',
    todos: ['Xuống tóc và thư giãn cùng khăn nóng kèm tinh dầu thơm'],
    category: 'Dịch vụ cắt tỉa'
  },
  {
    id: '4',
    title: 'Nối tóc DREADLOCK',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '3000k',
    priceLabel: '2500k-3000k',
    todos: ['Nối tóc DREADLOCK'],
    category: 'Dịch vụ cắt tỉa'
  },
  {
    id: '5',
    title: 'Uốn tóc',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '350k',
    priceLabel: '350k',
    todos: ['Uốn tạo kiểu giữ nếp cho mái tóc đẹp hơn'],
    category: 'Dịch vụ hóa chất'
  },
  {
    id: '6',
    title: 'Uốn PREMLOCK',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '800k',
    priceLabel: '800k',
    todos: ['Độc lạ cá tính'],
    category: 'Dịch vụ hóa chất'
  },
  {
    id: '7',
    title: 'Nhuộm màu thời trang',
    previewImage: '/img/nhuom-mau01.jpeg',
    price: '300k',
    priceLabel: '300k',
    todos: ['Thay đổi màu tóc thu hút ánh nhìn'],
    category: 'Dịch vụ hóa chất'
  },
  {
    id: '8',
    title: 'Nhuộm màu đen phủ bạc',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '150k',
    priceLabel: '150k',
    todos: ['Nhuộm màu đen phủ bạc'],
    category: 'Dịch vụ hóa chất'
  },
  {
    id: '9',
    title: 'LIGHT',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '100k',
    priceLabel: '100k',
    todos: [''],
    category: 'Dịch vụ hóa chất'
  },
  {
    id: '10',
    title: 'Tẩy tóc (1 lần)',
    previewImage: 'https://storage.30shine.com/service/combo_booking/382.jpg',
    price: '100k',
    priceLabel: '100k',
    todos: [''],
    category: 'Dịch vụ hóa chất'
  }
]

export const TEAM_NAME = {
  DINH_QUANG: 'Đình Quang',
  TRAN_DAT: 'Trần Đạt',
  VAN_LUONG: "Văn Lương"
}

export const TEAM_EMAILS = {
  DINH_QUANG: 'nguyendinhquang99bn@gmail.com',
  VAN_LUONG: 'vanluong2kx@gmail.com',
  TRAN_DAT: 'dattran24062004@gmail.com'
}


export const TEAM: ITeam[] = [
  {
    id: 1,
    name: TEAM_NAME.DINH_QUANG,
    position: '',
    description: 'Barber cao cấp',
    square_avatar: '/img/barber1_square.png',
    avatar: '/img/barber1.png',
    color: '#50b500',
    email: TEAM_EMAILS.DINH_QUANG,
  },
  {
    id: 2,
    name: TEAM_NAME.VAN_LUONG,
    position: '',
    description: 'Barber trung cấp',
    square_avatar: '/img/barber2_square.png',
    avatar: '/img/barber2.png',
    color: '#c94f08',
    email: TEAM_EMAILS.VAN_LUONG
  },
  {
    id: 3,
    name: TEAM_NAME.TRAN_DAT,
    position: '',
    description: 'Barber trung cấp',
    square_avatar: '/img/barber3_square.png',
    avatar: '/img/barber3.png',
    color: '#ac08c9',
    email: TEAM_EMAILS.TRAN_DAT
  }
]

export const STATUS = {
  DONE: 'done',
  PENDING: 'pending',
  OPEN: 'open'
}