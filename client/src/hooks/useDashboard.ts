import { useNavigate }      from "react-router-dom";
import { useAuth }          from "./useAuth";
import { getGreeting, formatTodayDate } from "../utils/dashboardHelpers";
import {
  DASHBOARD_STATS, UPCOMING_APPOINTMENTS,
  RECENT_HISTORY, DASHBOARD_NOTIFICATIONS, DASHBOARD_DOCTORS,
} from "../constants/dashboard.constants";

export function useDashboard() {
  const navigate    = useNavigate();
  const { user }    = useAuth();

  const firstName   = user?.name?.split(" ")[0] ?? "there";
  const greeting    = `${getGreeting()}, ${firstName} 👋`;
  const today       = formatTodayDate();

  return {
    greeting,
    today,
    stats:         DASHBOARD_STATS,
    appointments:  UPCOMING_APPOINTMENTS,
    history:       RECENT_HISTORY,
    notifications: DASHBOARD_NOTIFICATIONS,
    doctors:       DASHBOARD_DOCTORS,
    goToBook:      () => navigate("/patient/book"),
    goToAllAppts:  () => navigate("/patient/appointments"),
  };
}