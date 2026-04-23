// src/modules/appointments/dto/create-appointment.dto.ts
import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAppointmentDto {
  @IsUUID("4", { message: "doctorId must be a valid UUID" })
  doctorId!: string;

  @IsDateString({}, { message: "date must be a valid date string e.g. 2026-04-20" })
  date!: string;

  @IsString({ message: "time must be a string e.g. 9:00 AM" })
  time!: string;

  @IsString({ message: "type must be a string e.g. General Checkup" })
  type!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}