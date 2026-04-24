// src/modules/appointments/appointment.module.ts
import { Module }                from "@nestjs/common";
import { AppointmentService }     from "./appointments.service";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentController } from "./appointments.controller";
import { NotificationsModule }    from "../notifications/notifications.module";

@Module({
  imports: [
    NotificationsModule,   // needs NotificationService to send alerts
  ],
  providers: [
    AppointmentService,
    AppointmentRepository,
  ],
  controllers: [AppointmentController],
  exports:     [AppointmentRepository],  // exported so AvailabilityService can check booked slots
})
export class AppointmentsModule {}