import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import api from '../api/axios';
import { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
            return data;
        },
        onSuccess: (data) => {
            Cookies.set('token', data.data.token, { expires: 1 }); // 1 day
        }
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: RegisterPayload) => {
             const { data } = await api.post<AuthResponse>('/api/auth/register', payload);
             return data;
        },
        onSuccess: (data) => {
            Cookies.set('token', data.data.token, { expires: 1 }); // 1 day
        }
    });
}
