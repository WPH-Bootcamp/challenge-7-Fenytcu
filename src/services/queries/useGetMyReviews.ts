
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { MyReviewResponse } from "@/types/menu";

export const useGetMyReviews = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["my-reviews", page, limit],
    queryFn: async () => {
      const { data } = await api.get<MyReviewResponse>("/api/review/myreview", {
        params: { page, limit },
      });
      return data;
    },
  });
};
