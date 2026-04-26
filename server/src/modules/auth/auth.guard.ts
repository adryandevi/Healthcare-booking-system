import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector }  from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC }  from "../../common/decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt:       JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // ── Skip guard for @Public() routes ─────────────────────────────────────
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // ── Extract token from Authorization header ──────────────────────────────
    const request     = context.switchToHttp().getRequest();
    const authHeader  = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided.");
    }

    const token = authHeader.split(" ")[1];

    // ── Verify token and attach user to request ──────────────────────────────
    try {
      request.user = this.jwt.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token.");
    }
  }
}