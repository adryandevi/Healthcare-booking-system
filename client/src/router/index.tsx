import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage      from "../pages/auth/AuthPage";
import LoginPage     from "../pages/auth/LoginPage";
import RegisterPage  from "../pages/auth/RegisterPage";

import PatientLayout           from "../pages/patient/PatientLayout";
import DashboardPage           from "../pages/patient/DashboardPage";
import BookAppointmentPage     from "../pages/patient/BookAppointmentPage";
import PatientAppointmentsPage from "../pages/patient/AppointmentsPage";
import ProfilePage             from "../pages/patient/ProfilePage";

import DoctorLayout      from "../pages/doctor/DoctorLayout";
import SchedulePage      from "../pages/doctor/SchedulePage";
import QueuePage         from "../pages/doctor/QueuePage";
import AvailabilityPage  from "../pages/doctor/AvailabilityPage";
import DoctorPatientsPage from "../pages/doctor/PatientsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* DEFAULT → LOGIN */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* AUTH */}
      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login"    element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* PATIENT */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"    element={<DashboardPage />} />
        <Route path="book"         element={<BookAppointmentPage />} />
        <Route path="appointments" element={<PatientAppointmentsPage />} />
        <Route path="profile"      element={<ProfilePage />} />
      </Route>

      {/* DOCTOR */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<Navigate to="schedule" replace />} />
        <Route path="schedule"     element={<SchedulePage />} />
        <Route path="queue"        element={<QueuePage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="patients"     element={<DoctorPatientsPage />} />
      </Route>

      <Route path="*" element={<h1 className="p-8 text-2xl font-bold text-slate-900">404 — Page not found</h1>} />
    </Routes>
  );
}