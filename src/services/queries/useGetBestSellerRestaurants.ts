
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { BestSellerRestaurantResponse } from "@/types/menu";

export const useGetBestSellerRestaurants = (params?: {
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ['best-seller-restaurants', params],
        queryFn: async () => {
            const { data } = await api.get<BestSellerRestaurantResponse>('/api/resto/popular', {
                params
            });
            return data;
        },
    });
};
