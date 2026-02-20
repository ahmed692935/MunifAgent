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
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    created_at: string;
    is_admin: boolean;
    role: string;
  };
  onboard: boolean;
  onboarding_completed: boolean;
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
  first_name?: string | null;
  last_name?: string | null;
  created_at?: string;
  is_admin?: boolean;
  onboard?: boolean;
  onboarding_completed?: boolean;
  token: string; // keep this if backend returns `token`
  access_token?: string; // optional if some APIs return `access_token`
}

export interface AuthState {
  token: string | null; // global token for API calls
  user: User | null; // can be null after logout
  loading: boolean;
  error: string | null;
}
