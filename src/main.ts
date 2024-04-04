import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Resume Manager API')
    .setDescription('Resume Manager API Discription')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4949);

  console.log(
    `🚀🚀🚀🚀 Application is running on: http://localhost:4949/api 🚀`
  );
}
bootstrap();
