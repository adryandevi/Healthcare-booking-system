// src/modules/appointments/appointment.controller.ts
import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AppointmentService }         from "./appointments.service";
import { CreateAppointmentDto }     from "./dto/create-appointment.dto";
import { RescheduleAppointmentDto } from "./dto/reschedule-appointment.dto";
import { CancelAppointmentDto }     from "./dto/cancel-appointment.dto";
import { FilterAppointmentDto }     from "./dto/filter-appointment.dto";
import { Roles }                    from "../../common/decorators/roles.decorator";
import { CurrentUser }              from "../../common/decorators/current-user.decorator";
import { Role }                     from "../../common/enums/role.enum";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("appointments")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Roles(Role.PATIENT)
  book(
    @CurrentUser() user: { sub: string },
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.appointmentService.book(user.sub, dto);
  }

  @Get("my")
  @Roles(Role.PATIENT)
  getMyAppointments(
    @CurrentUser() user:       { sub: string },
    @Query()       pagination: PaginationDto,
  ) {
    return this.appointmentService.getByPatient(
      user.sub,
      pagination.page,
      pagination.limit,
    );
  }

  @Get("doctor")
  @Roles(Role.DOCTOR)
  getDoctorAppointments(
    @CurrentUser() user:       { sub: string },
    @Query()       pagination: PaginationDto,
  ) {
    return this.appointmentService.getByDoctor(
      user.sub,
      pagination.page,
      pagination.limit,
    );
  }

  @Get()
  @Roles(Role.ADMIN)
  getAll(
    @Query() filters:    FilterAppointmentDto,
    @Query() pagination: PaginationDto,
  ) {
    return this.appointmentService.getAll(
      filters,
      pagination.page,
      pagination.limit,
    );
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  findById(@Param("id") id: string) {
    return this.appointmentService.findById(id);
  }

  @Patch(":id/confirm")
  @Roles(Role.DOCTOR)
  confirm(
    @Param("id") id: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.appointmentService.confirm(id, user.sub);
  }

  @Patch(":id/cancel")
  @Roles(Role.PATIENT, Role.DOCTOR, Role.ADMIN)
  cancel(
    @Param("id") id: string,
    @CurrentUser() user: { sub: string },
    @Body() dto: CancelAppointmentDto,
  ) {
    return this.appointmentService.cancel(id, user.sub, dto);
  }

  @Patch(":id/reschedule")
  @Roles(Role.PATIENT)
  reschedule(
    @Param("id") id: string,
    @CurrentUser() user: { sub: string },
    @Body() dto: RescheduleAppointmentDto,
  ) {
    return this.appointmentService.reschedule(id, user.sub, dto);
  }

  @Patch(":id/force-confirm")
  @Roles(Role.ADMIN)
  forceConfirm(@Param("id") id: string) {
    return this.appointmentService.forceConfirm(id);
  }
}