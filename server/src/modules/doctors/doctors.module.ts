import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AvailabilityService } from './availability/availability.service';
import { AvailabilityController } from './availability/availability.controller';

@Module({
  controllers: [DoctorsController, AvailabilityController],
  providers: [DoctorsService, AvailabilityService]
})
export class DoctorsModule {}
