
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { RecommendedRestaurantResponse } from "@/types/menu";

export const useGetRecommendedRestaurants = () => {
  return useQuery({
    queryKey: ["recommended-restaurants"],
    queryFn: async () => {
      const { data } = await api.get<RecommendedRestaurantResponse>(
        "/api/resto/recommended"
      );
      return data;
    },
  });
};
