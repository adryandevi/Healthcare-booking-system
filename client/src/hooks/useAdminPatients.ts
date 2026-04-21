import { useState, useMemo, useCallback } from "react";
import { MOCK_ADMIN_PATIENTS }            from "../constants/adminPatient.constants";

export function useAdminPatients() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    MOCK_ADMIN_PATIENTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleView = useCallback((id: string) => {
    console.log("View patient", id);
  }, []);

  return { patients: filtered, search, setSearch, handleView };
}