import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS and allow your frontend (port 3000)
  app.enableCors({
    origin: process.env.CORS_ORIGIN, // Allow requests from frontend
    methods: process.env.CORS_METHODS, // Add allowed methods
    allowedHeaders: process.env.CORS_HEADERS, // Add allowed headers
  });
  app.setGlobalPrefix('api'); // Adds 'api' prefix to all routes
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
