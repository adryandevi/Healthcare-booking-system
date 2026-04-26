import { Module }                 from "@nestjs/common";
import { DoctorService }          from "./doctors.service";
import { DoctorRepository }       from "./doctor.repository";
import { DoctorController }       from "./doctors.controller";
import { AvailabilityService }    from "../doctors/availability/availability.service";
import { AvailabilityController } from "../doctors/availability/availability.controller";
import { AppointmentsModule }     from "../appointments/appointments.module";
import { PrismaModule }           from "../../config/prisma.module";

@Module({
  imports:     [PrismaModule, AppointmentsModule],
  providers:   [DoctorService, DoctorRepository, AvailabilityService],
  controllers: [DoctorController, AvailabilityController],
  exports:     [DoctorService, DoctorRepository],
})
export class DoctorModule {}