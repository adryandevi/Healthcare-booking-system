import { Module }               from "@nestjs/common";
import { NotificationService }   from "./notifications.service";
import { NotificationController } from "./notification.controller";

@Module({
  providers:   [NotificationService],
  controllers: [NotificationController],
  exports:     [NotificationService],  
})
export class NotificationsModule {}