export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  //created_at: Date;
  //updated_at: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId?: number;
  error?: string;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}