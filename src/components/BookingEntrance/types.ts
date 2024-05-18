import { ITeam } from "../Team/type";
import { IUserData } from "../UserList";

export interface IServiceItem {
  data: IService
  handleSelect: (data: IService) => void;
  serviceSelected: IService[]
}

export interface IService {
  id: string
  name: string
  image: string
  price: number
  price_text: string
  todos: string[]
  description: string
  category: string
  service_type: string;
  created_at: string
  updated_at: string
}

export interface IServicesList {
  booking: IGuestBooking;
  onDoneCallback: (list: string[]) => void;
}

export interface INameModal {
  onDoneCallback: (a: string) => void
  booking: IGuestBooking;
}

export interface IGuestBooking {
  guest: IUserData | null,
  barber: ITeam | null
  service_ids: string[],
  booking_time: string
  phone: string
}


export interface IBookingEntrance {
  phone?: string;
  name?: string;
  step?: string;
  services?: string;
}

export interface IBooking {
  id: string,
  barber_id: string,
  barber: IUserData,
  guest_id: string,
  guest: IUserData,
  status: string,
  services: IService[],
  booking_time: string,
  created_at: string,
  updated_at: string
}