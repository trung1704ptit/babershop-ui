import { ITeam } from "../Team/type";

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
  user: IUserBooking;
  handleContinue: (list: any) => void;
}

export interface INameModal {
  handleContinue: (a: string) => void
  phone: string;
}

export interface IUserBooking {
  id: string;
  phone: string;
  name: string
  services: IServiceDataItem[],
  datetime: IDatetime,
  notes: string,
  barber: ITeam | null,
  status: string
}

export interface IDatetime {
  time: number;
  date: Date;
}
export interface IBookingEntrance {
  phone?: string;
  name?: string;
}