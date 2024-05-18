import { ITeam } from "../components/Team/type"

export const TIME_LIST = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

export const PRODUCT_CATEGORIES = [{
  id: "ee22f7bb-c8bf-4091-af9a-0cc04ed099ba",
  name: 'Dịch vụ cắt tỉa'
},
{
  id: "ee22f7cb-c8bf-4091-af2a-0cc04ed021ba",
  name: 'Dịch vụ hóa chất'
}];

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

export const SERVICE_TYPES = {
  ONE_TIME: 'one_time',
  LONG_TIME: 'long_time',
}