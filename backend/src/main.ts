import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("BACKEND DESAFIO FULLSTACK")
      .setDescription("Nest.js - Postgresql")
      .setVersion("1")
      .build()
  );

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000, () => {
    console.log(`🚀 Server started on port ${3000}`);
  });
}
bootstrap();
