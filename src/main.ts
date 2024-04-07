import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Exposer le dossier uploads comme ressource statique

  await app.listen(4949);

  console.log(
    `🚀🚀🚀🚀 Application is running on: http://localhost:4949/api 🚀`
  );
}
bootstrap();
