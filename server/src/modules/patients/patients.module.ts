import { Module }            from "@nestjs/common";
import { PatientService }    from "./patients.service";
import { PatientRepository } from "./patient.repository";
import { PatientController } from "./patients.controller";
import { PrismaModule }      from "../../config/prisma.module";

@Module({
  imports:     [PrismaModule],  // ← not AuthModule
  providers:   [PatientService, PatientRepository],
  controllers: [PatientController],
  exports:     [PatientService, PatientRepository],
})
export class PatientModule {}