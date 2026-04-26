import { Injectable }    from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import type { Prisma }   from "@prisma/client";

@Injectable()
export class DoctorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.db.doctor.findMany({
      where:   { status: "active" },
      include: { user: true, weeklySchedule: true },
    });
  }

  async findById(id: string) {
    return this.prisma.db.doctor.findUnique({
      where:   { id },
      include: { user: true, weeklySchedule: true, blockedDates: true },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.db.doctor.findUnique({
      where:   { userId },
      include: { weeklySchedule: true },
    });
  }

  async create(data: Prisma.DoctorCreateInput) {
    return this.prisma.db.doctor.create({ data });
  }

  async update(id: string, data: Prisma.DoctorUpdateInput) {
    return this.prisma.db.doctor.update({ where: { id }, data });
  }

  async updateSchedule(
    doctorId: string,
    schedule: { day: string; startTime: string; endTime: string; enabled: boolean }[]
  ) {
    await this.prisma.db.weeklySchedule.deleteMany({ where: { doctorId } });
    await this.prisma.db.weeklySchedule.createMany({
      data: schedule.map((s) => ({ ...s, doctorId })),
    });
  }

  async deactivate(id: string) {
    return this.prisma.db.doctor.update({
      where: { id },
      data:  { status: "inactive" },
    });
  }
}