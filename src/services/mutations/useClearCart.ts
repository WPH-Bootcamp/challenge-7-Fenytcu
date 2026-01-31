
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { ClearCartResponse } from "@/types/cart";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete<ClearCartResponse>("/api/cart");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
};
