import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data } = await client.get('/profile');
      return data;
    },
  });
};
