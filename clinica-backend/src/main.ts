import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/**
 * Función principal para iniciar la aplicación
 * Configura middleware, Swagger y levanta el servidor.
 */
async function bootstrap() {
  // Crea la aplicación NestJS
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Habilita CORS para permitir solicitudes desde los sitios de clientes
  app.enableCors({
     origin: [
      'http://localhost:5173',
      'https://medicloudsv-backend.vercel.app'                   
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Configura validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    // Transforma los datos entrantes (ej: strings a números, si es necesario).
    transform: true,
    // Si la carga útil (payload) contiene propiedades que no están en el DTO, estas se eliminan.
    whitelist: true,
    // Si la carga útil contiene propiedades que no están definidas en el DTO, lanza un error.
    forbidNonWhitelisted: true,
    // Muestra solo los mensajes de error relevantes durante el desarrollo
    disableErrorMessages: false,
  }));
  
  // Configura archivos estáticos para servir el script de tracking
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // Configura Swagger
  const config = new DocumentBuilder()
    .setTitle('Clinica API')
    .setDescription('API para una clinica dental')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Endpoints de usuarios')
    .addTag('patients', 'Endpoints de pacientes')
    .addTag('medical_record', 'Endpoints de historial')
    .addTag('conditions', 'Endpoints para condiciones')
    .addTag('medical_record_conditions', 'Endpoints de historial medico y condicion')
    .addTag('treatments', 'Endpoints de tratamientos')
    .addTag('treatment_types', 'Endpoints para los tipos de tratamientos')
    .addTag('treatment_statuses', 'Endpoints para los estados de los tratamientos (admin)')
    .addTag('procedures', 'Endpoints para procedimientos')
    .addTag('payments', 'Endpoints para pagos')
    .addTag('appointments', 'Endpoints para als citas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Inicia el servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor iniciado en: http://localhost:${port}`);
  console.log(`Documentación Swagger: http://localhost:${port}/api/docs`);
}
if (!process.env.VERCEL) {
  bootstrap();
}
export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Importante: Habilitar CORS también aquí
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}

bootstrap();
