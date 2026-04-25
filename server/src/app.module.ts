import { Module }              from "@nestjs/common";
import { ConfigModule }        from "@nestjs/config";
import { PrismaModule }        from "./config/prisma.module";
import { AuthModule }          from "./modules/auth/auth.module";
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

})
export class AppModule {}