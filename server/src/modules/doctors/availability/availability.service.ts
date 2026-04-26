import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DoctorRepository }              from "../doctor.repository"
import { AppointmentRepository }         from "../../appointments/appointment.repository"
import { PrismaService }                from "../../../config/prisma.service"
import { UpdateAvailabilityDto }         from "../dto/update-availability.dto"
import { BlockDateDto }                 from "../dto/block-date.dto"
import { AppointmentStatus }            from "@prisma/client";

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly doctorRepo:      DoctorRepository,
    private readonly appointmentRepo: AppointmentRepository,
    private readonly prisma:          PrismaService,
  ) {}

  async getSlots(doctorId: string, date: string) {
    const doctor = await this.doctorRepo.findById(doctorId);
    if (!doctor) throw new NotFoundException("Doctor not found");

    // check if date is blocked
    const targetDate  = new Date(date);
    const blockedDate = await this.prisma.db.blockedDate.findFirst({
      where: {
        doctorId,
        date: {
          gte: new Date(targetDate.setHours(0,  0,  0,  0)),
          lte: new Date(targetDate.setHours(23, 59, 59, 999)),
        },
      },
    });
    if (blockedDate) return { slots: [], blockedReason: blockedDate.reason };

    // get day schedule
    const dayName     = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    const daySchedule = doctor.weeklySchedule?.find((d) => d.day === dayName && d.enabled);
    if (!daySchedule) return { slots: [] };

    // get booked slots
    const booked     = await this.appointmentRepo.findByDoctorAndDate(doctorId, new Date(date));
    const takenTimes = booked
      .filter((a) => a.status !== AppointmentStatus.cancelled)
      .map((a) => a.time);

    // generate and return slots
    const slots = this.generateSlots(daySchedule.startTime, daySchedule.endTime).map((time) => ({
      time,
      status: takenTimes.includes(time) ? "taken" : "available",
    }));

    return { slots };
  }

  async updateSchedule(userId: string, dto: UpdateAvailabilityDto) {
    const doctor = await this.doctorRepo.findByUserId(userId);
    if (!doctor) throw new NotFoundException("Doctor not found");

    await this.doctorRepo.updateSchedule(doctor.id, dto.schedule);
    return { message: "Schedule updated successfully" };
  }

  async blockDate(userId: string, dto: BlockDateDto) {
    const doctor = await this.doctorRepo.findByUserId(userId);
    if (!doctor) throw new NotFoundException("Doctor not found");

    const blocked = await this.prisma.db.blockedDate.create({
      data: {
        doctorId:  doctor.id,
        date:      new Date(dto.date),
        reason:    dto.reason,
        timeStart: dto.timeStart,
        timeEnd:   dto.timeEnd,
      },
    });
    return blocked;
  }

  async removeBlockedDate(id: string, userId: string) {
    const doctor = await this.doctorRepo.findByUserId(userId);
    if (!doctor) throw new NotFoundException("Doctor not found");

    const blocked = await this.prisma.db.blockedDate.findUnique({ where: { id } });
    if (!blocked || blocked.doctorId !== doctor.id)
      throw new NotFoundException("Blocked date not found");

    await this.prisma.db.blockedDate.delete({ where: { id } });
    return { message: "Blocked date removed" };
  }

  async getBlockedDates(doctorId: string) {
    return this.prisma.db.blockedDate.findMany({
      where:   { doctorId },
      orderBy: { date: "asc" },
    });
  }

  private generateSlots(start: string, end: string): string[] {
    const slots: string[] = [];    
    const [startH]   = start.split(":").map(Number);
    const [endH]     = end.split(":").map(Number);
    let   hour       = startH;

    while (hour < endH) {
      const suffix   = hour < 12 ? "AM" : "PM";
      const display  = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      slots.push(`${display}:00 ${suffix}`);
      hour++;
    }
    return slots;
  }
}