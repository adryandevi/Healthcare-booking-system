import { useState, useCallback }        from "react";
import { useNavigate }                  from "react-router-dom";
import { useAuth }                      from "./useAuth";
import { getRoleRedirect, validatePassword } from "../utils/authHelpers";
import type { Role, RegisterPayload }   from "../types/auth.types";

export function useRegister() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState<Role>("patient");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) { setError(validationError); return; }

    setError(null);
    setLoading(true);
    try {
      const user = await register({ name, email, password, role });
      navigate(getRoleRedirect(user.role as Role));
    } catch {
      setError("Registration failed. This email may already be in use.");
    } finally {
      setLoading(false);
    }
  }, [name, email, password, role, register, navigate]);

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    role, setRole,
    showPass, setShowPass,
    loading, error,
    handleSubmit,
  };
}