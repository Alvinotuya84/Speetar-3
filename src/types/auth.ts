export interface AuthResponse {
  access_token: string;
  success: boolean;
}
export interface UserProfileResponse {
  data: {
    id: number;
    username: string;
  };
  success: true;
}
export interface RegisterResponse {
  data: {
    username: string;
    password: string;
    id: number;
  };
  success: true;
  message?: string;
}
