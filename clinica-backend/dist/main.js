"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Servidor iniciado en: http://localhost:${port}`);
    console.log(`Documentación Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map