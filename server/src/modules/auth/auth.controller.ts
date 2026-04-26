import { Body, Controller, Get, Post, } from "@nestjs/common";
import { AuthService }   from "./auth.service";
import { LoginDto }      from "./dto/login.dto";
import { RegisterDto }   from "./dto/register.dto";
import { CurrentUser }   from "../../common/decorators/current-user.decorator";
import { Public }        from "../../common/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()   // ← no token needed
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()   // ← no token needed
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get("me")
  getMe(@CurrentUser() user: { sub: string }) {
    return this.authService.getMe(user.sub);
  }
}