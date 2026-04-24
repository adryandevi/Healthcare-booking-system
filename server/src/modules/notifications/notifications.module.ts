// src/modules/notifications/notification.module.ts
import { Module }               from "@nestjs/common";
import { NotificationService }   from "./notifications.service";
import { NotificationController } from "./notification.controller";

@Module({
  providers:   [NotificationService],
  controllers: [NotificationController],
  exports:     [NotificationService],   // exported so AppointmentService can send notifications
})
export class NotificationsModule {}