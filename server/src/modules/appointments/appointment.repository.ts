import { Injectable }        from "@nestjs/common";
import { PrismaService }     from "../../config/prisma.service";
import { AppointmentStatus } from "@prisma/client";
import { paginate }          from "../../common/helpers/paginate.helper";
import type { Prisma }       from "@prisma/client";

@Injectable()
export class AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters?: {
      status?:    AppointmentStatus;
      doctorId?:  string;
      patientId?: string;
    },
    page  = 1,
    limit = 20,
  ) {
    const skip  = (page - 1) * limit;
    const where = { ...filters };

    const [data, total] = await Promise.all([
      this.prisma.db.appointment.findMany({
        where,
        include: { patient: true, doctor: true },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.db.appointment.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  async findByPatient(patientId: string, page = 1, limit = 10) {
    const skip  = (page - 1) * limit;
    const where = { patientId };

    const [data, total] = await Promise.all([
      this.prisma.db.appointment.findMany({
        where,
        include: { doctor: { include: { user: true } } },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.db.appointment.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  async findByDoctor(doctorId: string, page = 1, limit = 10) {
    const skip  = (page - 1) * limit;
    const where = { doctorId };

    const [data, total] = await Promise.all([
      this.prisma.db.appointment.findMany({
        where,
        include: { patient: { include: { user: true } } },
        orderBy: { date: "asc" },
        skip,
        take: limit,
      }),
      this.prisma.db.appointment.count({ where }),
    ]);

    return paginate(data, total, page, limit);
  }

  async findById(id: string) {
    return this.prisma.db.appointment.findUnique({
      where:   { id },
      include: { patient: true, doctor: true },
    });
  }

  async findByDoctorAndDate(doctorId: string, date: Date) {
    const start = new Date(date); start.setHours(0,  0,  0,  0);
    const end   = new Date(date); end.setHours(23, 59, 59, 999);
    return this.prisma.db.appointment.findMany({
      where: { doctorId, date: { gte: start, lte: end } },
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

  async findPatientByUserId(userId: string) {
    return this.prisma.db.patient.findUnique({
      where: { userId },
    });
  }

  async findDoctorByUserId(userId: string) {
    return this.prisma.db.doctor.findUnique({
      where: { userId },
    });
  }
}