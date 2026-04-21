// src/hooks/useDoctors.ts
import { useState, useMemo, useCallback } from "react";
import type { Doctor }                    from "../types/doctor.types";
import { MOCK_DOCTORS }                   from "../constants/doctor.constants";

export function useDoctors() {
  const [doctors,  setDoctors]  = useState<Doctor[]>(MOCK_DOCTORS);
  const [search,   setSearch]   = useState("");

  const filtered = useMemo(() =>
    doctors.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    ),
    [doctors, search]
  );

  const handleEdit = useCallback((id: string) => {
    console.log("Edit doctor", id);
  }, []);

  const handleDeactivate = useCallback((id: string) => {
    setDoctors((prev) =>
      prev.map((d) => d.id === id ? { ...d, status: "inactive" } : d)
    );
  }, []);

  const handleAddDoctor = useCallback(() => {
    console.log("Add doctor");
  }, []);

  return {
    doctors: filtered,
    search,
    setSearch,
    handleEdit,
    handleDeactivate,
    handleAddDoctor,
  };
}