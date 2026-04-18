import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage     from "../pages/auth/AuthPage";
import LoginPage    from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import PatientLayout          from "../pages/patient/PatientLayout";
import DashboardPage          from "../pages/patient/DashboardPage";
import BookAppointmentPage    from "../pages/patient/BookAppointmentPage";
import PatientAppointmentsPage from "../pages/patient/AppointmentsPage";
import ProfilePage            from "../pages/patient/ProfilePage";

export default function AppRouter() {
  return (
    <Routes>
      {/* DEFAULT → LOGIN */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* AUTH LAYOUT */}
      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login"    element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* PATIENT LAYOUT */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"         element={<DashboardPage />} />
        <Route path="book"              element={<BookAppointmentPage />} />
        <Route path="appointments"      element={<PatientAppointmentsPage />} />
        <Route path="profile"           element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}