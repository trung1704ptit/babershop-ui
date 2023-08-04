import { IUserBooking } from "../../interface/components/bookingEntrance";

export interface IServiceItem {
  data: IServiceDataItem
  handleSelect: (id: string) => void;
  serviceSelected: string[]
}

export interface IServiceDataItem {
  id: string;
  title: string,
  previewImage: string,
  price: string | number,
  todos: string[];
}

export interface IServicesList {
  user: IUserBooking;
  handleContinue: (list: any) => void;
}