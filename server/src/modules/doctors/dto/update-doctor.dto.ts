import { IsEnum, IsOptional, IsString } from "class-validator";
import { DoctorStatus }                 from "@prisma/client";

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(DoctorStatus, { message: "Status must be active, on_leave or inactive" })
  status?: DoctorStatus;
}