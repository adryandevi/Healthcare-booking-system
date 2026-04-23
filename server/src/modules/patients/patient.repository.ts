import { Injectable }    from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import type { Prisma }   from "../../generated/prisma";

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.db.patient.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return this.prisma.db.patient.findUnique({
      where:   { id },
      include: { user: true, appointments: { include: { doctor: true } } },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.db.patient.findUnique({
      where:   { userId },
      include: { user: true },
    });
  }

  async create(data: Prisma.PatientCreateInput) {
    return this.prisma.db.patient.create({ data });
  }

  async update(id: string, data: Prisma.PatientUpdateInput) {
    return this.prisma.db.patient.update({ where: { id }, data });
  }
}