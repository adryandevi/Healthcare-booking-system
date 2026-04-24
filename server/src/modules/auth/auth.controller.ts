import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService }  from "./auth.service";
import { LoginDto }     from "./dto/login.dto";
import { RegisterDto }  from "./dto/register.dto";
import { AuthGuard }    from "../../common/guards/auth.guard";
import { CurrentUser }  from "../../common/decorators/current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: { sub: string }) {
    return this.authService.getMe(user.sub);
  }
}