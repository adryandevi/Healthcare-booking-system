import { getStatusConfig }      from "../../utils/patientAppointmentHelpers";
import type { AppointmentStatus } from "../../types/patientAppointment.types";

export default function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, dotColor, pillClasses } = getStatusConfig(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${pillClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
      {label}
    </span>
  );
}