import { Module }              from "@nestjs/common";
import { APP_GUARD }           from "@nestjs/core";
import { ConfigModule }        from "@nestjs/config";
import { PrismaModule }        from "./config/prisma.module";
import { AuthModule }          from "./modules/auth/auth.module";
import { AuthGuard }           from "./common/guards/auth.guard";
import { UserModule }          from "./modules/users/users.module";
import { PatientModule }       from "./modules/patients/patients.module";
import { DoctorModule }        from "./modules/doctors/doctors.module";
import { AppointmentsModule }  from "./modules/appointments/appointments.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    PatientModule,
    DoctorModule,
    AppointmentsModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide:  APP_GUARD,
      useClass: AuthGuard,   // ← global guard, Reflector auto-available here
    },
  ],
})
export class AppModule {}