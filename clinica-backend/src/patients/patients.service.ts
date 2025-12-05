import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { MedicalRecordService } from '../medical_record/medical_record.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { User } from '../users/users.entity';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,
        private medicalRecordService: MedicalRecordService,
    ) {}

    /**
     * Crea un nuevo paciente y lo asigna al doctor actual
     * @param createPatientDto - Datos del paciente
     * @param user - El usuario (Doctor/Admin) que crea el registro
     */
    async create(createPatientDto: CreatePatientDto, user: User): Promise<any> {
        const newPatient = this.patientsRepository.create({
            ...createPatientDto,
            doctor: user, 
        });
        const savedPatient = await this.patientsRepository.save(newPatient);
        const medicalRecord = await this.medicalRecordService.create({
            patientId: savedPatient.id,
        });
        return {
            ...savedPatient,
            medicalRecordId: medicalRecord.id,
        };
    }

    /**
     * Obtiene pacientes según el rol
     * - Admin: Ve todos
     * - Doctor: Ve solo los suyos
     */
    async findAll(user: User): Promise<Patient[]> {
        const queryOptions: any = {
            relations: ['medicalRecord'],
        };
        if (user.role !== 'admin') {
            queryOptions.where = {
                doctor: { id: user.id }
            };
        }

        return this.patientsRepository.find(queryOptions);
    }

    /**
     * Busca un paciente por ID, pero verifica que pertenezca al doctor
     */
    async findOne(id: string, user: User): Promise<Patient> {
        const whereCondition: any = { id };
        if (user.role !== 'admin') {
            whereCondition.doctor = { id: user.id };
        }

        const patient = await this.patientsRepository.findOne({
            where: whereCondition,
            relations: ['medicalRecord'],
        });

        if (!patient) {
            throw new NotFoundException(`Paciente no encontrado o no tiene acceso a él.`);
        }

        return patient;
    }

    /**
     * Actualiza un paciente (validando propiedad)
     */
    async update(id: string, updatePatientDto: UpdatePatientDto, user: User): Promise<Patient> {
        await this.findOne(id, user); 
        const patientToUpdate = await this.patientsRepository.preload({
            id: id,
            ...updatePatientDto,
        });

        if (!patientToUpdate) {
            throw new NotFoundException(`El paciente con ID ${id} no encontrado`);
        }

        return this.patientsRepository.save(patientToUpdate);
    }

    async remove(id: string): Promise<void> {
        const patient = await this.patientsRepository.findOne({ where: { id } });
        if (!patient) throw new NotFoundException('Paciente no encontrado');
        
        await this.patientsRepository.remove(patient);
    }
}