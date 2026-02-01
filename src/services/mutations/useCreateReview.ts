
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { CreateReviewResponse } from "@/types/menu";

interface CreateReviewPayload {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
}

export const useCreateReview = () => {
    return useMutation({
        mutationFn: async (payload: CreateReviewPayload) => {
            const { data } = await api.post<CreateReviewResponse>('/api/review', payload);
            return data;
        },
    });
};
