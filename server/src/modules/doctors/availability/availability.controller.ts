import { Body, Controller, Delete, Get, Param, Post, Put, Query, } from "@nestjs/common";
import { AvailabilityService }   from "./availability.service";
import { UpdateAvailabilityDto } from "../dto/update-availability.dto";
import { BlockDateDto }          from "../dto/block-date.dto";
import { Roles }                 from "../../../common/decorators/roles.decorator";
import { CurrentUser }           from "../../../common/decorators/current-user.decorator";
import { Role }                  from "../../../common/enums/role.enum";

@Controller("doctors")
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get(":id/slots")
  @Roles(Role.PATIENT, Role.ADMIN, Role.DOCTOR)
  getSlots(
    @Param("id") doctorId: string,
    @Query("date") date: string,
  ) {
    return this.availabilityService.getSlots(doctorId, date);
  }

  @Get(":id/blocked-dates")
  @Roles(Role.ADMIN, Role.DOCTOR)
  getBlockedDates(@Param("id") doctorId: string) {
    return this.availabilityService.getBlockedDates(doctorId);
  }

  @Put("me/availability")
  @Roles(Role.DOCTOR)
  updateSchedule(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdateAvailabilityDto,
  ) {
    return this.availabilityService.updateSchedule(user.sub, dto);
  }

  @Post("me/blocked-dates")
  @Roles(Role.DOCTOR)
  blockDate(
    @CurrentUser() user: { sub: string },
    @Body() dto: BlockDateDto,
  ) {
    return this.availabilityService.blockDate(user.sub, dto);
  }

  @Delete("me/blocked-dates/:id")
  @Roles(Role.DOCTOR)
  removeBlockedDate(
    @Param("id") id: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.availabilityService.removeBlockedDate(id, user.sub);
  }
}