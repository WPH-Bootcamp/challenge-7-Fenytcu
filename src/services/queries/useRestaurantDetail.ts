import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { RestaurantDetailResponse } from '@/types/menu';

export const useRestaurantDetail = (id: number) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const { data } = await api.get<RestaurantDetailResponse>(`/api/resto/${id}`);
      return data.data; 
    },
    enabled: !!id,
  });
};
