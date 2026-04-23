import { Injectable }        from "@nestjs/common";
import { PrismaService }     from "../../config/prisma.service";
import { AppointmentStatus } from "../../generated/prisma";
import type { Prisma }       from "../../generated/prisma";

@Injectable()
export class AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.db.appointment.findUnique({
      where:   { id },
      include: { patient: true, doctor: true },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.db.appointment.findMany({
      where:   { patientId },
      include: { doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    });
  }

  async findByDoctor(doctorId: string) {
    return this.prisma.db.appointment.findMany({
      where:   { doctorId },
      include: { patient: { include: { user: true } } },
      orderBy: { date: "asc" },
    });
  }

  async findByDoctorAndDate(doctorId: string, date: Date) {
    const start = new Date(date); start.setHours(0,  0,  0,  0);
    const end   = new Date(date); end.setHours(23, 59, 59, 999);
    return this.prisma.db.appointment.findMany({
      where: { doctorId, date: { gte: start, lte: end } },
    });
  }

  async findAll(filters?: {
    status?:   AppointmentStatus;
    doctorId?: string;
    patientId?: string;
  }) {
    return this.prisma.db.appointment.findMany({
      where:   filters,
      include: { patient: true, doctor: true },
      orderBy: { date: "desc" },
    });
  }

  async create(data: Prisma.AppointmentCreateInput) {
    return this.prisma.db.appointment.create({ data });
  }

  async updateStatus(id: string, status: AppointmentStatus, cancelReason?: string) {
    return this.prisma.db.appointment.update({
      where: { id },
      data:  { status, ...(cancelReason && { cancelReason }) },
    });
  }

  async update(id: string, data: Prisma.AppointmentUpdateInput) {
    return this.prisma.db.appointment.update({ where: { id }, data });
  }
}