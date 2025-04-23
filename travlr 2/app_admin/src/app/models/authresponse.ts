export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role?: string; // Optional: if your backend sends user role
  };
}
