import { IsEnum, IsOptional, IsUUID, IsDateString } from "class-validator";
import { AppointmentStatus }                         from "../../../generated/prisma";

export class FilterAppointmentDto {
  @IsOptional()
  @IsEnum(AppointmentStatus, { message: "Invalid status value" })
  status?: AppointmentStatus;

  @IsOptional()
  @IsUUID("4")
  doctorId?: string;

  @IsOptional()
  @IsUUID("4")
  patientId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}