import { MedicalRecordService } from './medical_record.service';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
export declare class MedicalRecordController {
    private readonly medicalRecordService;
    constructor(medicalRecordService: MedicalRecordService);
    create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<import("./medical_record.entity").MedicalRecord>;
    findAll(): Promise<import("./medical_record.entity").MedicalRecord[]>;
    findOne(id: string): Promise<import("./medical_record.entity").MedicalRecord>;
}
