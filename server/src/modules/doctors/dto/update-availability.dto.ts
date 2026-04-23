import { IsArray, IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type }                                          from "class-transformer";

class DayScheduleDto {
  @IsString({ message: "Day must be a string e.g. Monday" })
  day!: string;

  @IsString({ message: "Start time must be a string e.g. 08:00" })
  startTime!: string;

  @IsString({ message: "End time must be a string e.g. 17:00" })
  endTime!: string;

  @IsBoolean()
  enabled!: boolean;
}

export class UpdateAvailabilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayScheduleDto)
  schedule!: DayScheduleDto[];
}