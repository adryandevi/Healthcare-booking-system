import { IsDateString, IsString } from "class-validator";

export class RescheduleAppointmentDto {
  @IsDateString({}, { message: "date must be a valid date string e.g. 2026-04-20" })
  date!: string;

  @IsString({ message: "time must be a string e.g. 9:00 AM" })
  time!: string;
}