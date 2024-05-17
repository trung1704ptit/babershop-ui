import { ITeam } from "../Team/type";
import { IUserData } from "../UserList";

export interface IServiceItem {
  data: IServiceDataItem
  handleSelect: (data: IServiceDataItem) => void;
  serviceSelected: IServiceDataItem[]
}

export interface IServiceDataItem {
  id: string;
  title: string,
  previewImage: string,
  price: string | number,
  priceLabel: string,
  todos: string[];
  category?: string;
}

export interface IServicesList {
  booking: IGuestBooking;
  onDoneCallback: (list: any) => void;
}

export interface INameModal {
  onDoneCallback: (a: string) => void
  booking: IGuestBooking;
}

export interface IGuestBooking {
  guest: IUserData | null,
  barber: ITeam | null
  services: IServiceDataItem[],
  bookingTime: string
  phone: string
}


export interface IBookingEntrance {
  phone?: string;
  name?: string;
}