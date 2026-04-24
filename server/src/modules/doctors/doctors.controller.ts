// src/modules/doctors/doctor.controller.ts
import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { DoctorService }     from "./doctors.service";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { AuthGuard }       from "../../common/guards/auth.guard";
import { RolesGuard }      from "../../common/guards/roles.guard";
import { Roles }           from "../../common/decorators/roles.decorator";
import { CurrentUser }     from "../../common/decorators/current-user.decorator";
import { Role }            from "../../common/enums/role.enum";

@Controller("doctors")
@UseGuards(AuthGuard, RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @Roles(Role.ADMIN, Role.PATIENT, Role.DOCTOR)
  findAll() {
    return this.doctorService.findAll();
  }

  @Get("me")
  @Roles(Role.DOCTOR)
  getMyProfile(@CurrentUser() user: { sub: string }) {
    return this.doctorService.findByUserId(user.sub);
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.PATIENT, Role.DOCTOR)
  findById(@Param("id") id: string) {
    return this.doctorService.findById(id);
  }

  @Patch("me")
  @Roles(Role.DOCTOR)
  updateMyProfile(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(user.sub, dto);
  }

  @Patch(":id/deactivate")
  @Roles(Role.ADMIN)
  deactivate(@Param("id") id: string) {
    return this.doctorService.deactivate(id);
  }
}