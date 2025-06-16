import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data } = await client.get('/properties');
      return data;
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await client.get(`/properties/${id}`);
      return data;
    },
    enabled: !!id, // Only run the query if id is truthy
  });
};
