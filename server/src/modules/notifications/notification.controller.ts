import { Controller, Get, Param, Patch, Query, } from "@nestjs/common";
import { NotificationService }  from "./notifications.service";
import { Roles }               from "../../common/decorators/roles.decorator";
import { CurrentUser }         from "../../common/decorators/current-user.decorator";
import { Role }                from "../../common/enums/role.enum";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @Roles(Role.PATIENT, Role.DOCTOR, Role.ADMIN)
  getMyNotifications(
    @CurrentUser() user:       { sub: string },
    @Query()       pagination: PaginationDto,
  ) {
    return this.notificationService.getByUser(
      user.sub,
      pagination.page,
      pagination.limit,
    );
  }

  @Get("unread-count")
  @Roles(Role.PATIENT, Role.DOCTOR, Role.ADMIN)
  getUnreadCount(@CurrentUser() user: { sub: string }) {
    return this.notificationService.getUnreadCount(user.sub);
  }

  @Patch(":id/read")
  @Roles(Role.PATIENT, Role.DOCTOR, Role.ADMIN)
  markRead(
    @Param("id") id: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.notificationService.markRead(id, user.sub);
  }

  @Patch("read-all")
  @Roles(Role.PATIENT, Role.DOCTOR, Role.ADMIN)
  markAllRead(@CurrentUser() user: { sub: string }) {
    return this.notificationService.markAllRead(user.sub);
  }
}