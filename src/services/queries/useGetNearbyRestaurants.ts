
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { NearbyRestaurantResponse } from "@/types/menu";

export const useGetNearbyRestaurants = () => {
    return useQuery({
        queryKey: ['nearby-restaurants'],
        queryFn: async () => {
            const { data } = await api.get<NearbyRestaurantResponse>('/api/resto/nearby');
            return data;
        },
    });
};
