import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createPatientDto: CreatePatientDto): Promise<import("./patient.entity").Patient>;
    findAll(): Promise<import("./patient.entity").Patient[]>;
    findOne(id: string): Promise<import("./patient.entity").Patient>;
}
