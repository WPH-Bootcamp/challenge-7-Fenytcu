import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { RestaurantListResponse } from "@/types/menu";



export const useGetRestaurants = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: async () => {
      const { data } = await api.get<RestaurantListResponse>("/api/resto", {
        params,
      });
      return data;
    },
  });
};
