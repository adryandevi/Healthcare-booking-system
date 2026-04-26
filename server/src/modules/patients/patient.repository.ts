import { Injectable }    from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import { paginate }      from "../../common/helpers/paginate.helper";
import type { Prisma }   from "../../generated/prisma";

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.db.patient.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.db.patient.count(),
    ]);

    return paginate(data, total, page, limit);
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