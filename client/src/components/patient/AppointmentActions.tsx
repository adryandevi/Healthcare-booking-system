import type { AppointmentStatus } from "../../types/patientAppointment.types";

interface ActionButtonProps {
  children:  React.ReactNode;
  onClick:   () => void;
  variant?:  "default" | "danger";
}

function ActionButton({ children, onClick, variant = "default" }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        variant === "danger"
          ? "text-red-500 hover:text-red-700"
          : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

interface Props {
  status:        AppointmentStatus;
  onReschedule:  () => void;
  onCancel:      () => void;
  onViewNotes:   () => void;
  onRebook:      () => void;
}

export default function AppointmentActions({
  status, onReschedule, onCancel, onViewNotes, onRebook,
}: Props) {
  const ACTION_MAP: Record<AppointmentStatus, React.ReactNode> = {
    confirmed: (
      <>
        <ActionButton onClick={onReschedule}>Reschedule</ActionButton>
        <ActionButton onClick={onCancel} variant="danger">Cancel</ActionButton>
      </>
    ),
    pending: (
      <>
        <ActionButton onClick={onReschedule}>Reschedule</ActionButton>
        <ActionButton onClick={onCancel} variant="danger">Cancel</ActionButton>
      </>
    ),
    completed: <ActionButton onClick={onViewNotes}>View notes</ActionButton>,
    cancelled: <ActionButton onClick={onRebook}>Rebook</ActionButton>,
  };

  return <div className="flex items-center gap-4">{ACTION_MAP[status]}</div>;
}