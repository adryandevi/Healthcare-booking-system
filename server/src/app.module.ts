// src/app.module.ts
import { Module }              from "@nestjs/common";
import { ConfigModule }        from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { PrismaModule }        from "./config/prisma.module";
import { AuthModule }          from "./modules/auth/auth.module";
import { UserModule }          from "./modules/users/users.module";
import { PatientModule }       from "./modules/patients/patients.module";
import { DoctorModule }        from "./modules/doctors/doctors.module";
import { AppointmentsModule }  from "./modules/appointments/appointments.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";

import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

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
    { provide: APP_FILTER,      useClass: HttpExceptionFilter },  
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },  
  ],
})
export class AppModule {}