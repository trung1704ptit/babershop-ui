export interface IBookingEntrance {
  phone?: string | number;
  name?: string | undefined
}

export interface INameModal {
  handleContinue: (a: string) => void
}

export interface IUserBooking {
  phone: string | number | null | undefined
  name: string | null | undefined,
  services: null,
  bookingTime: string | null,
  notes: string | null,
  barber: string | null
}