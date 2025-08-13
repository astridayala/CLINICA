import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';

/**
 * Modulo de pacientes
 * Configura el repositorio y servicios relacionados con sitios
 */
@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsService],
  controllers: [PatientsController],
  exports: [PatientsService]
})
export class PatientModule {}
