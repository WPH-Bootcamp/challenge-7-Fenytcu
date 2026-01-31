
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { DeleteReviewResponse } from "@/types/menu";

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete<DeleteReviewResponse>(
        `/api/review/${id}`
      );
      return data;
    },
  });
};
