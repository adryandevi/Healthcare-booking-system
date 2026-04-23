import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Role } from "../../../common/enums/role.enum";

export class RegisterDto {
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters" })
  name!: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password!: string;

  @IsEnum(Role, { message: "Role must be patient, doctor or admin" })
  role!: Role;
}