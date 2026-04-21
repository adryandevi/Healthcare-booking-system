import type { DashboardNotification } from "../../types/dashboard.types";
import { getNotificationBg, getNotificationDot } from "../../utils/dashboardHelpers";

export default function DashboardNotificationItem({ color, message, time }: DashboardNotification) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ backgroundColor: getNotificationBg(color) }}>
      <p className="text-sm text-slate-700 flex items-start gap-2">
        <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getNotificationDot(color) }} />
        {message}
      </p>
      <p className="text-xs text-slate-400 mt-1 ml-4">{time}</p>
    </div>
  );
}