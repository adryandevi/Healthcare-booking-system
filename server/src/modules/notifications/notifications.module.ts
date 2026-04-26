import { Module }                 from "@nestjs/common";
import { NotificationService }    from "./notifications.service";
import { NotificationController } from "./notification.controller";
import { PrismaModule }           from "../../config/prisma.module";

@Module({
  imports:     [PrismaModule],
  providers:   [NotificationService],
  controllers: [NotificationController],
  exports:     [NotificationService],
})
export class NotificationsModule {}