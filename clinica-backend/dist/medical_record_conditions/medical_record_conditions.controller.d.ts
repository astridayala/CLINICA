import { MedicalRecordConditionsService } from './medical_record_conditions.service';
import { CreateMedicalRecordConditionDto } from './dto/create-medical_record_condition.dto';
export declare class MedicalRecordConditionsController {
    private readonly medicalRecordConditionService;
    constructor(medicalRecordConditionService: MedicalRecordConditionsService);
    create(createMedicalRecordConditionDto: CreateMedicalRecordConditionDto): Promise<import("./medical_record_condition.entity").MedicalRecordCondition>;
    findAll(): Promise<import("./medical_record_condition.entity").MedicalRecordCondition[]>;
    findOne(id: string): Promise<import("./medical_record_condition.entity").MedicalRecordCondition>;
    remove(id: string): Promise<Boolean>;
}
