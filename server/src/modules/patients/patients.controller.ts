import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { PatientService }   from "./patients.service";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { AuthGuard }        from "../../common/guards/auth.guard";
import { RolesGuard }       from "../../common/guards/roles.guard";
import { Roles }            from "../../common/decorators/roles.decorator";
import { CurrentUser }      from "../../common/decorators/current-user.decorator";
import { Role }             from "../../common/enums/role.enum";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("patients")
@UseGuards(AuthGuard, RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query() pagination: PaginationDto) {
    return this.patientService.findAll(
      pagination.page,
      pagination.limit,
    );
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