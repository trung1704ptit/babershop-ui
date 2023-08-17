export interface IBookingPage {
  phone?: string | number
  name?: string
}

export interface IBookingItem {
  id: string;
  barber: {
    name: string,
    color: string,
  },
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
    priceLabel: string,
    title: string
  }[],
  status: string
}