import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/auth.service";

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

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

// ✅ Typed default — no more empty {}
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  login: async () => { throw new Error("AuthContext not initialized"); },
  register: async () => { throw new Error("AuthContext not initialized"); },
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,  setUser]  = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token") ?? sessionStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      authService.getMe(token).then(setUser).catch(() => {
        setToken(null);
        setUser(null);
      });
    }
  }, [token]);

  const login = useCallback(
    async (email: string, password: string, remember: boolean): Promise<User> => {
      const { user, token } = await authService.login(email, password);
      setUser(user);
      setToken(token);
      (remember ? localStorage : sessionStorage).setItem("token", token);
      return user;
    },
    []
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<User> => {
      const { user, token } = await authService.register(payload);
      setUser(user);
      setToken(token);
      sessionStorage.setItem("token", token);
      return user;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}