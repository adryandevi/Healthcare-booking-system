import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService }  from "@nestjs/jwt";
import { Reflector }   from "@nestjs/core";
import { IS_PUBLIC }   from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector:  Reflector,   // ← add this
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // ← check @Public() first
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;   // ← skip auth entirely

    const request = context.switchToHttp().getRequest();
    const token   = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedException("No token provided");

    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}