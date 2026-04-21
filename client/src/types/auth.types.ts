export type Role = "patient" | "doctor" | "admin";

export interface AuthUser {
  id:    string;
  name:  string;
  email: string;
  role:  Role;
}

export interface LoginPayload {
  email:    string;
  password: string;
  remember: boolean;
}

export interface RegisterPayload {
  name:     string;
  email:    string;
  password: string;
  role:     Role;
}

export interface AuthState {
  user:  AuthUser | null;
  token: string | null;
}