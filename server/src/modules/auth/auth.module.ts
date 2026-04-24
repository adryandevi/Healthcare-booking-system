import { Module }            from "@nestjs/common";
import { JwtModule }         from "@nestjs/jwt";
import { AuthService }       from "./auth.service";
import { AuthController }    from "./auth.controller";
import { UserModule }        from "../users/users.module";   
import { PatientModule }     from "../patients/patients.module"; 
import { DoctorModule }      from "../doctors/doctors.module"; 
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PatientModule,
    DoctorModule,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:      config.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: config.getOrThrow("JWT_EXPIRES_IN") as "30m",
        },
      }),
    }),
  ],
  providers:   [AuthService],
  controllers: [AuthController],
  exports:     [AuthService, JwtModule],
})
export class AuthModule {}