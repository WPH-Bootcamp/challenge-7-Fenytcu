
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { UserProfileResponse } from "@/types/auth";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get<UserProfileResponse>("/api/auth/profile");
      return data;
    },
  });
};
