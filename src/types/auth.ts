export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    interests?: string;
    newsletter?: boolean;
  }
  
  export interface SignInFormData {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    interests?: string;
    newsletter?: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
  }