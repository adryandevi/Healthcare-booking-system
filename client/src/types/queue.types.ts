export type QueueStatus = "pending" | "confirmed" | "rejected";

export interface QueueEntry {
  id:        string;
  patient:   string;
  initials:  string;
  type:      string;
  datetime:  string;
  status:    QueueStatus;
}