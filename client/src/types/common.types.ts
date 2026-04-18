// src/types/common.types.ts

// ─── Async operation state ────────────────────────────────────────────────────
// Used by any form or action that talks to an API.
// Instead of three separate booleans (isLoading, isError, isSuccess),
// one status union covers all states cleanly.

export type AsyncStatus = "idle" | "loading" | "saving" | "saved" | "error";

export interface SaveState {
  status:  AsyncStatus;
  message: string;
}

// ─── API response wrapper ─────────────────────────────────────────────────────
// Every service function returns this shape so callers
// handle success and error the same way, every time.

export interface ApiResponse<T> {
  data:    T | null;
  error:   string | null;
  success: boolean;
}

// ─── Paginated list ───────────────────────────────────────────────────────────
// Used by tables that support page-by-page loading
// (admin appointments list, patient directory, etc.)

export interface PaginatedResult<T> {
  items:      T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}