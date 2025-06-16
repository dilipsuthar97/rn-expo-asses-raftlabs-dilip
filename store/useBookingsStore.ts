import { Booking } from '@/types/Booking';
import { create } from 'zustand';

interface BookingsState {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

export const useBookingsStore = create<BookingsState>(set => ({
  bookings: [],
  setBookings: bookings => set(state => ({ bookings })),
}));
