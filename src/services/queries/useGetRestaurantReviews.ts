
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { RestaurantReviewResponse } from "@/types/menu";

export const useGetRestaurantReviews = (
  restaurantId: number,
  page = 1,
  limit = 10
) => {
  return useQuery({
    queryKey: ["restaurant-reviews", restaurantId, page, limit],
    queryFn: async () => {
      const { data } = await api.get<RestaurantReviewResponse>(
        `/api/review/restaurant/${restaurantId}`,
        {
          params: { page, limit },
        }
      );
      return data;
    },
    enabled: !!restaurantId,
  });
};
