import { Module }                from "@nestjs/common";
import { AppointmentService }    from "./appointments.service";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentController } from "./appointments.controller";
import { NotificationsModule }   from "../notifications/notifications.module";
import { PrismaModule }          from "../../config/prisma.module";

@Module({
  imports:     [PrismaModule, NotificationsModule],
  providers:   [AppointmentService, AppointmentRepository],
  controllers: [AppointmentController],
  exports:     [AppointmentRepository],
})
export class AppointmentsModule {}