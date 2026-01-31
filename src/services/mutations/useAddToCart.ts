
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { AddToCartPayload, AddToCartResponse } from "@/types/cart";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const { data } = await api.post<AddToCartResponse>("/api/cart", payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate cart query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
};
