// src/modules/patients/patient.controller.ts
import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { PatientService }   from "./patients.service";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { AuthGuard }        from "../../common/guards/auth.guard";
import { RolesGuard }       from "../../common/guards/roles.guard";
import { Roles }            from "../../common/decorators/roles.decorator";
import { CurrentUser }      from "../../common/decorators/current-user.decorator";
import { Role }             from "../../common/enums/role.enum";

@Controller("patients")
@UseGuards(AuthGuard, RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.patientService.findAll();
  }

  @Get("me")
  @Roles(Role.PATIENT)
  getMyProfile(@CurrentUser() user: { sub: string }) {
    return this.patientService.findByUserId(user.sub);
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.DOCTOR)
  findById(@Param("id") id: string) {
    return this.patientService.findById(id);
  }

  @Patch("me")
  @Roles(Role.PATIENT)
  updateMyProfile(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.updateProfile(user.sub, dto);
  }
}