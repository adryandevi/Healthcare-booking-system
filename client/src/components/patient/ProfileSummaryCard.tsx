import { getInitials } from "../../utils/getInitials";

interface Props {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
}

export default function ProfileSummaryCard({ firstName, lastName, email, phone }: Props) {
  const initials = getInitials(firstName, lastName);
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 flex items-center gap-5">
      <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
        <span className="text-xl font-semibold text-white">{initials}</span>
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-900 leading-tight">
          {fullName || "Your Name"}
        </p>
        <p className="text-sm text-slate-400 mt-0.5">
          Patient · Member since January 2025
        </p>
        <div className="flex items-center gap-4 mt-2">
          {email && <span className="text-sm text-slate-400">{email}</span>}
          {phone && <span className="text-sm text-slate-400">{phone}</span>}
        </div>
      </div>
    </div>
  );
}