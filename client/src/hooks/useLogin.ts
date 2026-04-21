import { useState, useCallback }      from "react";
import { useNavigate }                from "react-router-dom";
import { useAuth }                    from "./useAuth";
import { getRoleRedirect }            from "../utils/authHelpers";
import { ROLE_DEMO }                  from "../constants/auth.constants";
import type { Role, LoginPayload }    from "../types/auth.types";

export function useLogin() {
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(email, password, remember);
      navigate(getRoleRedirect(user.role as Role));
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email, password, remember, login, navigate]);

  const handleDemoLogin = useCallback(async (role: Role) => {
    const creds = ROLE_DEMO[role];
    setError(null);
    setLoading(true);
    try {
      const user = await login(creds.email, creds.password, false);
      navigate(getRoleRedirect(user.role as Role));
    } catch {
      setError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [login, navigate]);

  return {
    email, setEmail,
    password, setPassword,
    remember, setRemember,
    showPass, setShowPass,
    loading, error,
    handleSubmit,
    handleDemoLogin,
  };
}