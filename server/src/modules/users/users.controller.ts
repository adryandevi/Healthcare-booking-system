import { Body, Controller, Delete, Get, Param, Patch,  } from "@nestjs/common";
import { UserService }   from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles }        from "../../common/decorators/roles.decorator";
import { Role }         from "../../common/enums/role.enum";

@Controller("users")
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