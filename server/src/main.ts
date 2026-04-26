import { NestFactory }           from "@nestjs/core";
import { AppModule }             from "./app.module";
import { globalValidationPipe }  from "./common/pipes/validation.pipe";
import { HttpExceptionFilter }   from "./common/filters/http-exception.filter";
import { ResponseInterceptor }   from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin:      process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  });

  // ── Start ─────────────────────────────────────────────────────────────────
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
}

bootstrap();