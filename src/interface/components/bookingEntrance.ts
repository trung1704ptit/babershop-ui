export interface IBookingEntrance {
  phone?: string | number
}

export interface INameModal {
  handleContinue: (a: string) => void
}

export interface IUserBooking {
  phone: string | number | null | undefined
  name: string | null,
  services: null,
  bookingTime: string | null,
  notes: string | null,
  barber: string | null
}