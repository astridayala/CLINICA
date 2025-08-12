import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/**
 * Función principal para iniciar la aplicación
 * Configura middleware, Swagger y levanta el servidor
 */
async function bootstrap() {
  // Crea la aplicación NestJS
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Habilita CORS para permitir solicitudes desde los sitios de clientes
  app.enableCors();
  
  // Configura validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Configura archivos estáticos para servir el script de tracking
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // Configura Swagger
  const config = new DocumentBuilder()
    .setTitle('PixelFactory Analytics API')
    .setDescription('API para el sistema de analítica web de PixelFactory')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Endpoints de usuarios')
    .addTag('sites', 'Endpoints de sitios web')
    .addTag('events', 'Endpoints de eventos')
    .addTag('analytics', 'Endpoints de analíticas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Inicia el servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor iniciado en: http://localhost:${port}`);
  console.log(`Documentación Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
