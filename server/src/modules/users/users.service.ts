import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository }                from "./user.repository";
import { UpdateUserDto }                 from "./dto/update-user.dto";
import * as bcrypt                       from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.userRepo.update(id, dto);
  }

  async deactivate(id: string) {
    await this.findById(id);
    return this.userRepo.deactivate(id);
  }

  async findAll() {
    return this.userRepo.findAll();
  }
}