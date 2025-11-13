// types/auth.ts

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

export interface AuthError {
  message: string;
  code?: string;
}
