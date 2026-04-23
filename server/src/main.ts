// src/main.ts
import { NestFactory }    from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule }      from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:        true,    // strips unknown properties
      forbidNonWhitelisted: true, // throws error on unknown properties
      transform:        true,    // auto-transforms payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.enableCors({
    origin:      process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();