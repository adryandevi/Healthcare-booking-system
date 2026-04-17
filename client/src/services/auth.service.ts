import api from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "admin";
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getMe: async (token: string): Promise<User> => {
    const { data } = await api.get<User>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};