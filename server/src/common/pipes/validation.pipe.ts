import { ValidationPipe } from "@nestjs/common";

export const globalValidationPipe = new ValidationPipe({
  whitelist:            true,   // strips unknown fields
  forbidNonWhitelisted: true,   // rejects unknown fields with 400
  transform:            true,   // auto converts types
  transformOptions: {
    enableImplicitConversion: true,  // uses TS types for conversion
  },
});