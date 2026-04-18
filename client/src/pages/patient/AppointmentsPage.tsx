import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Doctor {
  name: string;
  specialty: string;
  initials: string;
}

interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
}

// ─── Mock data (replace with useAppointments() hook) ─────────────────────────

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-001",
    doctor: { name: "Dr. Reyes", specialty: "General Practice", initials: "DR" },
    date: "April 20, 2026",
    time: "9:00 AM",
    type: "General Checkup",
    status: "confirmed",
  },
  {
    id: "APT-002",
    doctor: { name: "Dr. Lim", specialty: "Internal Medicine", initials: "DL" },
    date: "April 25, 2026",
    time: "2:30 PM",
    type: "Lab Results Review",
    status: "pending",
  },
  {
    id: "APT-003",
    doctor: { name: "Dr. Reyes", specialty: "General Practice", initials: "DR" },
    date: "April 14, 2026",
    time: "10:00 AM",
    type: "Blood Panel",
    status: "completed",
  },
  {
    id: "APT-004",
    doctor: { name: "Dr. Cruz", specialty: "Cardiology", initials: "DC" },
    date: "March 28, 2026",
    time: "3:00 PM",
    type: "Consultation",
    status: "cancelled",
  },
];

const STATUS_FILTER_OPTIONS: { label: string; value: AppointmentStatus | "all" }[] = [
  { label: "All statuses", value: "all" },
  { label: "Confirmed",    value: "confirmed" },
  { label: "Pending",      value: "pending" },
  { label: "Completed",    value: "completed" },
  { label: "Cancelled",    value: "cancelled" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns Tailwind classes for the avatar background + text
 * based on the doctor's initials. Each doctor gets a consistent color.
 */
function getAvatarColor(initials: string): string {
  const colorMap: Record<string, string> = {
    DR: "bg-teal-100 text-teal-700",
    DL: "bg-blue-100 text-blue-700",
    DC: "bg-red-100 text-red-500",
    DM: "bg-amber-100 text-amber-700",
  };
  return colorMap[initials] ?? "bg-slate-100 text-slate-600";
}

/**
 * Returns display config for a given appointment status.
 * All status logic lives here — never scattered across the UI.
 */
function getStatusConfig(status: AppointmentStatus): {
  label: string;
  dotColor: string;
  pillClasses: string;
} {
  const config: Record<AppointmentStatus, ReturnType<typeof getStatusConfig>> = {
    confirmed: {
      label:       "Confirmed",
      dotColor:    "bg-green-500",
      pillClasses: "bg-green-50 text-green-700 border border-green-200",
    },
    pending: {
      label:       "Pending",
      dotColor:    "bg-amber-400",
      pillClasses: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    completed: {
      label:       "Completed",
      dotColor:    "bg-slate-400",
      pillClasses: "bg-slate-100 text-slate-500 border border-slate-200",
    },
    cancelled: {
      label:       "Cancelled",
      dotColor:    "bg-red-400",
      pillClasses: "bg-red-50 text-red-500 border border-red-200",
    },
  };
  return config[status];
}

/**
 * Determines which action buttons to show based on status.
 * This is the clean alternative to if/else chains in the JSX.
 */
function getActions(
  status: AppointmentStatus,
  handlers: {
    onReschedule: () => void;
    onCancel: () => void;
    onViewNotes: () => void;
    onRebook: () => void;
  }
): React.ReactNode {
  const actionMap: Record<AppointmentStatus, React.ReactNode> = {
    confirmed: (
      <>
        <ActionButton onClick={handlers.onReschedule}>Reschedule</ActionButton>
        <ActionButton onClick={handlers.onCancel} variant="danger">Cancel</ActionButton>
      </>
    ),
    pending: (
      <>
        <ActionButton onClick={handlers.onReschedule}>Reschedule</ActionButton>
        <ActionButton onClick={handlers.onCancel} variant="danger">Cancel</ActionButton>
      </>
    ),
    completed: (
      <ActionButton onClick={handlers.onViewNotes}>View notes</ActionButton>
    ),
    cancelled: (
      <ActionButton onClick={handlers.onRebook}>Rebook</ActionButton>
    ),
  };
  return actionMap[status];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

function ActionButton({ children, onClick, variant = "default" }: ActionButtonProps) {
  const colorClasses =
    variant === "danger"
      ? "text-red-500 hover:text-red-700"
      : "text-slate-600 hover:text-slate-900";

  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${colorClasses}`}
    >
      {children}
    </button>
  );
}

interface StatusBadgeProps {
  status: AppointmentStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dotColor, pillClasses } = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${pillClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
      {label}
    </span>
  );
}

interface DoctorAvatarProps {
  initials: string;
}

function DoctorAvatar({ initials }: DoctorAvatarProps) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${getAvatarColor(initials)}`}
    >
      {initials}
    </div>
  );
}

interface AppointmentRowProps {
  appointment: Appointment;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  onViewNotes: (id: string) => void;
  onRebook: (id: string) => void;
}

function AppointmentRow({
  appointment,
  onReschedule,
  onCancel,
  onViewNotes,
  onRebook,
}: AppointmentRowProps) {
  const { id, doctor, date, time, type, status } = appointment;

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
      {/* Doctor */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <DoctorAvatar initials={doctor.initials} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{doctor.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{doctor.specialty}</p>
          </div>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-slate-800">{date}</p>
        <p className="text-xs text-slate-400 mt-0.5">{time}</p>
      </td>

      {/* Type */}
      <td className="px-5 py-4">
        <p className="text-sm text-slate-700">{type}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={status} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-4">
          {getActions(status, {
            onReschedule: () => onReschedule(id),
            onCancel:     () => onCancel(id),
            onViewNotes:  () => onViewNotes(id),
            onRebook:     () => onRebook(id),
          })}
        </div>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

  // Replace with: const { appointments, isLoading } = useAppointments();
  const appointments = MOCK_APPOINTMENTS;

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filtered =
    statusFilter === "all"
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  // ── Handlers ────────────────────────────────────────────────────────────────
  // Replace these with real service calls from useAppointments()

  function handleReschedule(id: string) {
    console.log("Reschedule", id);
    // navigate(`/patient/appointments/${id}/reschedule`);
  }

  function handleCancel(id: string) {
    console.log("Cancel", id);
    // openCancelModal(id);
  }

  function handleViewNotes(id: string) {
    console.log("View notes", id);
    // navigate(`/patient/appointments/${id}/notes`);
  }

  function handleRebook(id: string) {
    console.log("Rebook", id);
    // navigate(`/patient/book?rebookFrom=${id}`);
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            View and manage your full appointment history.
          </p>
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | "all")}
          className="
            text-sm text-slate-700 bg-white border border-slate-200
            rounded-full px-4 py-2 pr-8 appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            hover:border-slate-300 transition-colors
          "
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[##F5F5F5]">
              {["Doctor", "Date & Time", "Type", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3.5 text-left text-xs font-semibold text-[#000000] uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                  No appointments found for this status.
                </td>
              </tr>
            ) : (
              filtered.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  onViewNotes={handleViewNotes}
                  onRebook={handleRebook}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}