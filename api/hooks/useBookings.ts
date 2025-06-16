import { Booking } from '@/types/Booking';
import { useMutation, useQuery } from '@tanstack/react-query';
import client, { queryClient } from '../client';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await client.get('/bookings');
      return data;
    },
  });
};

export const useBookProperty = () => {
  return useMutation({
    mutationFn: async (booking: Booking) => {
      const { data } = await client.post(`/bookings`, booking);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });
};
