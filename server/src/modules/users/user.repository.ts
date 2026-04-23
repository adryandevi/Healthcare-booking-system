import { Injectable }    from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import type { Prisma }   from "../../generated/prisma";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.db.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.db.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.db.user.update({ where: { id }, data });
  }

  async deactivate(id: string) {
    return this.prisma.db.user.update({
      where: { id },
      data:  { isActive: false },
    });
  }
}