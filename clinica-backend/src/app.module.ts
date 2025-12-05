import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patients/patients.module';
import { MedicalRecordModule } from './medical_record/medical_record.module';
import { ConditionsModule } from './conditions/condition.module';
import { MedicalRecordConditionsModule } from './medical_record_conditions/medical_record_conditions.module';
import { TreatmentsTypesModule } from './treatments_types/treatments_types.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { ProceduresModule } from './procedures/procedures.module';
import { PaymentsModule } from './payments/payments.module';
import { TreatmentStatusesModule } from './treatment_statuses/treatment_statuses.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Módulo principal de la aplicación
 * Configura módulos globales y dependencias
 */
@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. CONEXIÓN A BASE DE DATOS (Supabase / Render)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Usamos la URL completa para conexión (funciona para Local y Nube)
        url: configService.get<string>('DATABASE_URL'), 
        autoLoadEntities: true,
        // Lógica segura traída de tu DatabaseModule:
        // Solo sincroniza (crea tablas automáticamente) si NO estamos en producción
        synchronize: configService.get('NODE_ENV') !== 'production', 
        logging: configService.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false, // Necesario para Supabase
        },
      }),
    }),
    // Configuración de la base de datos
    //DatabaseModule,
    
    // Módulos de la aplicación
    UsersModule,
    AuthModule,
    PatientModule,
    MedicalRecordModule,
    ConditionsModule,
    MedicalRecordConditionsModule,
    TreatmentsTypesModule,
    TreatmentsModule,
    ProceduresModule,
    PaymentsModule,
    TreatmentStatusesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
