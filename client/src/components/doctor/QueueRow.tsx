import type { QueueEntry } from "../../types/queue.types";
import { STATUS_STYLES, getAvatarColor } from "../../utils/queueHelpers";

interface Props {
  entry:     QueueEntry;
  onConfirm: (id: string) => void;
  onReject:  (id: string) => void;
}

export default function QueueRow({ entry, onConfirm, onReject }: Props) {
  const style  = STATUS_STYLES[entry.status];
  const avatar = getAvatarColor(entry.initials);

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* Patient */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatar}`}>
            {entry.initials}
          </div>
          <span className="text-sm font-medium text-slate-800">{entry.patient}</span>
        </div>
      </td>

      {/* Type */}
      <td className="px-5 py-4 text-sm text-slate-600">{entry.type}</td>

      {/* Requested time */}
      <td className="px-5 py-4 text-sm text-slate-600">{entry.datetime}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        {entry.status === "pending" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onConfirm(entry.id)}
              className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => onReject(entry.id)}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            {entry.status === "confirmed" ? "View" : "—"}
          </span>
        )}
      </td>

    </tr>
  );
}