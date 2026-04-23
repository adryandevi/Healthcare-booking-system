import { IsDateString, IsOptional, IsString } from "class-validator";

export class BlockDateDto {
  @IsDateString({}, { message: "Date must be a valid date string" })
  date!: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  timeStart?: string;

  @IsOptional()
  @IsString()
  timeEnd?: string;
}