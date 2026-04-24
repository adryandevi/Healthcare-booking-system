// src/modules/doctors/doctor.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { DoctorRepository }              from "./doctor.repository";
import { UpdateDoctorDto }               from "./dto/update-doctor.dto";

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepo: DoctorRepository) {}

  async findAll() {
    return this.doctorRepo.findAll();
  }

  async findById(id: string) {
    const doctor = await this.doctorRepo.findById(id);
    if (!doctor) throw new NotFoundException("Doctor not found");
    return doctor;
  }

  async findByUserId(userId: string) {
    const doctor = await this.doctorRepo.findByUserId(userId);
    if (!doctor) throw new NotFoundException("Doctor profile not found");
    return doctor;
  }

  async update(userId: string, dto: UpdateDoctorDto) {
    const doctor = await this.findByUserId(userId);
    return this.doctorRepo.update(doctor.id, dto);
  }

  async deactivate(id: string) {
    await this.findById(id);
    return this.doctorRepo.deactivate(id);
  }
}