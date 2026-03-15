export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}