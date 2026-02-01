
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { CartResponse } from "@/types/cart";

export const useGetUserCart = () => {
    return useQuery({
        queryKey: ["user-cart"],
        queryFn: async () => {
            const { data } = await api.get<CartResponse>("/api/cart");
            return data;
        },
    });
};
