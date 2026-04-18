// src/hooks/useDoctorPatients.ts
import { useState, useMemo, useCallback } from "react";
import type { PatientSummary  }                   from "../types/patient.types";

const MOCK_PATIENTS: PatientSummary[] = [
  { id: "1", name: "Maria Santos", initials: "MS", email: "maria@email.com", lastVisit: "Apr 14, 2026", totalVisits: 7, condition: "Hypertension" },
  { id: "2", name: "Jose Cruz",    initials: "JC", email: "jose@email.com",  lastVisit: "Apr 10, 2026", totalVisits: 3, condition: "Diabetes"      },
  { id: "3", name: "Pedro Ramos",  initials: "PR", email: "pedro@email.com", lastVisit: "Mar 28, 2026", totalVisits: 2, condition: "Asthma"        },
];

export function useDoctorPatients() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    MOCK_PATIENTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleSearch  = useCallback((v: string) => setSearch(v), []);
  const handleView    = useCallback((id: string) => {
    // navigate(`/doctor/patients/${id}`)
    console.log("View patient", id);
  }, []);

  return { patients: filtered, search, handleSearch, handleView };
}