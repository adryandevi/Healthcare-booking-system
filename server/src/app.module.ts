import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PatientsModule } from './modules/patients/patients.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PrismaModule } from './config/prisma.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    AppointmentsModule, 
    DoctorsModule, 
    PatientsModule, 
    NotificationsModule, 
    PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
