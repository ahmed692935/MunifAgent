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

// ------
export interface User {
  user?: string;
  id: number;
  username: string;
  email: string;
  token: string; // keep this if backend returns `token`
  access_token?: string; // optional if some APIs return `access_token`
}

export interface AuthState {
  token: string | null; // global token for API calls
  user: User | null; // can be null after logout
  loading: boolean;
  error: string | null;
}
