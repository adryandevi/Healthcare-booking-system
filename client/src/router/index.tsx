import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../pages/auth/AuthPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* DEFAULT → LOGIN */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* AUTH LAYOUT */}
      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}