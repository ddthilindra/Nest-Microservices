import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  console.log("Test >>>>>>> ")
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // nestjs validation -> pipes , whitelist -> stop save extra properties than the DTO
  app.useLogger(app.get(Logger)); // log request
  await app.listen(3000);
}
bootstrap();
