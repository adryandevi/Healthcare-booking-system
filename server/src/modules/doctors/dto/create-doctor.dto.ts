import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { DoctorStatus }                            from "../../../generated/prisma";

export class CreateDoctorDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsString()
  specialty!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}