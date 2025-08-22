import { MedicalRecord } from './medical_record.entity';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { Patient } from 'src/patients/patient.entity';
export declare class MedicalRecordService {
    private medicalRecordRepository;
    private patientRepository;
    constructor(medicalRecordRepository: Repository<MedicalRecord>, patientRepository: Repository<Patient>);
    create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord>;
    findOne(id: string): Promise<MedicalRecord>;
    findAll(): Promise<MedicalRecord[]>;
}
