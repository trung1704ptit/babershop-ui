import { IServiceDataItem } from "../components/BookingEntrance/types"
import { ITeam } from "../components/Team/type"

export const TIME_LIST = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

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
  VAN_TUAN: 'Văn Tuấn',
  VAN_LUONG: "Văn Lương"
}

export const TEAM_EMAILS = {
  DINH_QUANG: 'nguyendinhquang99bn@gmail.com',
  VAN_LUONG: 'vanluong2kx@gmail.com',
  VAN_TUAN: 'hotuananh24092000@gmail.com'
}


export const TEAM: ITeam[] = [
  {
    id: '1',
    name: TEAM_NAME.DINH_QUANG,
    position: '',
    intro: 'Barber cao cấp',
    square_photo: '/img/barbers/quang.jpg',
    photo: '/img/barbers/quang.jpg',
    color: '#50b500',
    email: TEAM_EMAILS.DINH_QUANG,
    phone: '098323223'
  },
  {
    id: '2',
    name: TEAM_NAME.VAN_LUONG,
    position: '',
    intro: 'Barber trung cấp',
    square_photo: '/img/barbers/luong.jpeg',
    photo: '/img/barbers/luong.jpeg',
    color: '#c94f08',
    email: TEAM_EMAILS.VAN_LUONG,
    phone: '098323223'
  },
  {
    id: '3',
    name: TEAM_NAME.VAN_TUAN,
    position: '',
    intro: 'Barber trung cấp',
    square_photo: '/img/barbers/tuan.jpg',
    photo: '/img/barbers/tuan.jpg',
    color: '#ac08c9',
    email: TEAM_EMAILS.VAN_TUAN,
    phone: '098323223'
  }
]

export const STATUS = {
  DONE: 'done',
  PENDING: 'pending',
  OPEN: 'open'
}

export const CONTACT = {
  phoneText: '0965.813.633',
  phoneVal: '0965813633',
  email: 'nguyendinhquang99bn@gmail.com'
}

export const MESSAGES = {
  REGISTER_USER_EXISTS_EN: "User with that email or phone already exists",
  REGISTER_USER_EXISTS_VI: 'Đăng ký không thành công. Tài khoản email hoặc số điện thoại đẵ được đăng ký.',
  REGISTER_USER_SUCCESS_VI: 'Đăng ký tài khoản thành công',
  COMMON_ERROR_VI: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
  INALID_EMAIL_OR_PASSWORD_EN: "Invalid email or Password",
  INALID_EMAIL_OR_PASSWORD_VI: "Email hoặc mật khẩu không đúng"
}

export const ROLES = {
  ADMIN: 'admin',
  BARBER: 'barber',
  GUEST: 'guest',
}