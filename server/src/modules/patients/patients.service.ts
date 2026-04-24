// src/modules/patients/patient.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientRepository }             from "./patient.repository";
import { UpdatePatientDto }              from "./dto/update-patient.dto";

@Injectable()
export class PatientService {
  constructor(private readonly patientRepo: PatientRepository) {}

  async findAll() {
    return this.patientRepo.findAll();
  }

  async findById(id: string) {
    const patient = await this.patientRepo.findById(id);
    if (!patient) throw new NotFoundException("Patient not found");
    return patient;
  }

  async findByUserId(userId: string) {
    const patient = await this.patientRepo.findByUserId(userId);
    if (!patient) throw new NotFoundException("Patient profile not found");
    return patient;
  }

  async updateProfile(userId: string, dto: UpdatePatientDto) {
    const patient = await this.findByUserId(userId);
    return this.patientRepo.update(patient.id, {
      ...dto,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
    });
  }
}