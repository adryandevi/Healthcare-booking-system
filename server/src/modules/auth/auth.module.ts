import { Module }            from "@nestjs/common";
import { JwtModule }         from "@nestjs/jwt";
import { APP_GUARD }         from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService }       from "./auth.service";
import { AuthController }    from "./auth.controller";
import { AuthGuard }         from "../../common/guards/auth.guard";
import { UserModule }        from "../users/users.module";
import { PatientModule }     from "../patients/patients.module";
import { DoctorModule }      from "../doctors/doctors.module";

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
  providers: [
    AuthService,
    AuthGuard,
    {
      provide:  APP_GUARD,  // ← every route protected by default
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports:     [AuthService, JwtModule],
})
export class AuthModule {}