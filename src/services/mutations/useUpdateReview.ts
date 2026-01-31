
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { ReviewDetailResponse } from "@/types/menu";

interface UpdateReviewPayload {
  id: number;
  star: number;
  comment: string;
}

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateReviewPayload) => {
      const { data } = await api.put<ReviewDetailResponse>(
        `/api/review/${id}`,
        payload
      );
      return data;
    },
  });
};
