import { MedicalRecordCondition } from './medical_record_condition.entity';
import { Repository } from 'typeorm';
import { CreateMedicalRecordConditionDto } from './dto/create-medical_record_condition.dto';
export declare class MedicalRecordConditionsService {
    private medicalRecordConditionRepository;
    constructor(medicalRecordConditionRepository: Repository<MedicalRecordCondition>);
    create(createMedicalRecordConditionDto: CreateMedicalRecordConditionDto): Promise<MedicalRecordCondition>;
    findAll(): Promise<MedicalRecordCondition[]>;
    findOne(id: string): Promise<MedicalRecordCondition>;
    remove(id: string): Promise<Boolean>;
}
