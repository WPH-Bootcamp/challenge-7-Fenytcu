export interface User {
  id: number;         
  name: string;       
  email: string;
  phone: string;       
  avatar: string | null;
  latitude?: number;
  longitude?: number;
  createdAt?: string; 
}

export interface AuthResponse {
  success: boolean;    
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}
