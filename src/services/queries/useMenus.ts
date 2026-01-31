import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

// Deprecated: logic moved to useRestaurantDetail
export const useMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      // const { data } = await api.get<MenuResponse>('/api/menus');
      return []; 
    },
  });
};
