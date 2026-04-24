import { Module }                 from "@nestjs/common";
import { DoctorService }          from "./doctors.service";
import { DoctorRepository }       from "./doctor.repository";
import { DoctorController }       from "./doctors.controller";
import { AvailabilityService }    from "../doctors/availability/availability.service";
import { AvailabilityController } from "../doctors/availability/availability.controller";
import { AppointmentsModule }     from "../appointments/appointments.module";

@Module({
  imports: [
    AppointmentsModule,   // needs AppointmentRepository for slot checking
  ],
  providers: [
    DoctorService,
    DoctorRepository,
    AvailabilityService,
  ],
  controllers: [
    DoctorController,
    AvailabilityController,
  ],
  exports: [
    DoctorService,
    DoctorRepository,   // exported so AuthService can create doctor profile on register
  ],
})
export class DoctorModule {}