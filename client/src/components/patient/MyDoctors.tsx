
// Replace with real data from useDoctors() later

interface AssignedDoctor {
  initials:  string;
  name:      string;
  specialty: string;
  bg:        string;
  fg:        string;
}

const ASSIGNED_DOCTORS: AssignedDoctor[] = [
  {
    initials:  "DR",
    name:      "Dr. Reyes",
    specialty: "General Practice",
    bg:        "bg-teal-100",
    fg:        "text-teal-700",
  },
  {
    initials:  "DL",
    name:      "Dr. Lim",
    specialty: "Internal Medicine",
    bg:        "bg-blue-100",
    fg:        "text-blue-700",
  },
];

export default function MyDoctors() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">My doctors</h3>

      <div className="flex flex-col gap-3">
        {ASSIGNED_DOCTORS.map((doc) => (
          <div key={doc.name} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${doc.bg} ${doc.fg}`}>
              {doc.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{doc.name}</p>
              <p className="text-xs text-slate-400">{doc.specialty}</p>
            </div>
            <button className="text-xs text-slate-400 hover:text-teal-600 transition-colors flex-shrink-0">
              Book
            </button>
          </div>
        ))}

        <button className="mt-1 text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors text-left">
          + Find a new doctor
        </button>
      </div>
    </div>
  );
}