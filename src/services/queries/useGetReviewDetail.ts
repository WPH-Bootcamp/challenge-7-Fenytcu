
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { ReviewDetailResponse } from "@/types/menu";

export const useGetReviewDetail = (reviewId: number) => {
  return useQuery({
    queryKey: ["review-detail", reviewId],
    queryFn: async () => {
      const { data } = await api.get<ReviewDetailResponse>(
        `/api/review/${reviewId}`
      );
      return data;
    },
    enabled: !!reviewId,
  });
};
