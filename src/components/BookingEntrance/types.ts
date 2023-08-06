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
  todos: string[];
}

export interface IServicesList {
  user: IUserBooking;
  handleContinue: (list: any) => void;
}

export interface INameModal {
  handleContinue: (a: string) => void
}

export interface IUserBooking {
  phone: string | number | null | undefined
  name: string | null | undefined,
  services: IServiceDataItem[],
  datetime: IDatetime,
  notes: string,
  stylist: string
}

export interface IDatetime {
  time: number;
  date: Date;
}
export interface IBookingEntrance {
  phone?: string | number;
  name?: string;
}