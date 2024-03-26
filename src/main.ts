import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @JurakulovUtkir can be used to get data from .env variables
 */
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
