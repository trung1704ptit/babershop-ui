export interface IBookingPage {
  phone?: string | number
  name?: string
}

export interface IBookingItem {
  id?: string;
  baber: string,
  name: string,
  datetime: {
    date: any,
    time: number,
  },
  notes?: string,
  phone: string,
  services: {
    id: string,
    price: string,
    title: string
  }[]
}