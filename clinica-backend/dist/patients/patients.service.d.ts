import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { MedicalRecordService } from 'src/medical_record/medical_record.service';
export declare class PatientsService {
    private patientsRepository;
    private medicalRecordService;
    constructor(patientsRepository: Repository<Patient>, medicalRecordService: MedicalRecordService);
    create(createPatientDto: CreatePatientDto): Promise<any>;
    findAll(): Promise<Patient[]>;
    findOne(id: string): Promise<Patient>;
}
