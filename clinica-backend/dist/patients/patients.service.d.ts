import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { MedicalRecordService } from 'src/medical_record/medical_record.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { User } from '../users/users.entity';
export declare class PatientsService {
    private patientsRepository;
    private medicalRecordService;
    constructor(patientsRepository: Repository<Patient>, medicalRecordService: MedicalRecordService);
    create(createPatientDto: CreatePatientDto, user: User): Promise<any>;
    findAll(user: User): Promise<Patient[]>;
    findOne(id: string, user: User): Promise<Patient>;
    update(id: string, updatePatientDto: UpdatePatientDto, user: User): Promise<Patient>;
    remove(id: string): Promise<void>;
}
