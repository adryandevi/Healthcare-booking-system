import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import AuthPage     from "../pages/auth/AuthPage";
import LoginPage    from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Patient
import PatientLayout           from "../pages/patient/PatientLayout";
import DashboardPage           from "../pages/patient/DashboardPage";
import BookAppointmentPage     from "../pages/patient/BookAppointmentPage";
import PatientAppointmentsPage from "../pages/patient/AppointmentsPage";
import ProfilePage             from "../pages/patient/ProfilePage";

// Doctor
import DoctorLayout       from "../pages/doctor/DoctorLayout";
import SchedulePage        from "../pages/doctor/SchedulePage";
import QueuePage           from "../pages/doctor/QueuePage";
import AvailabilityPage    from "../pages/doctor/AvailabilityPage";
import DoctorPatientsPage  from "../pages/doctor/PatientsPage";

// Admin
import AdminLayout        from "../pages/admin/AdminLayout";
import OverviewPage       from "../pages/admin/OverviewPage";
import AdminAppointmentsPage from "../pages/admin/AppointmentsPage";
import DoctorsPage        from "../pages/admin/DoctorsPage";
import AdminPatientsPage  from "../pages/admin/PatientsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* DEFAULT */}
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

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview"     element={<OverviewPage />} />
        <Route path="appointments" element={<AdminAppointmentsPage />} />
        <Route path="doctors"      element={<DoctorsPage />} />
        <Route path="patients"     element={<AdminPatientsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1 className="p-8 text-2xl font-bold text-slate-900">404 — Page not found</h1>} />
    </Routes>
  );
}