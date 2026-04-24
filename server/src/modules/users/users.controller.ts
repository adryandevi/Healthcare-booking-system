import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UserService }   from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard }    from "../../common/guards/auth.guard";
import { RolesGuard }   from "../../common/guards/roles.guard";
import { Roles }        from "../../common/decorators/roles.decorator";
import { Role }         from "../../common/enums/role.enum";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Patch(":id/deactivate")
  @Roles(Role.ADMIN)
  deactivate(@Param("id") id: string) {
    return this.userService.deactivate(id);
  }
}