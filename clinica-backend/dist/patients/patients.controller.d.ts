import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { User } from '../users/users.entity';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(user: User): Promise<import("./patient.entity").Patient[]>;
    create(createPatientDto: CreatePatientDto, user: User): Promise<any>;
    findOne(id: string, user: User): Promise<import("./patient.entity").Patient>;
    update(id: string, updatePatientDto: UpdatePatientDto, user: User): Promise<import("./patient.entity").Patient>;
    remove(id: string): Promise<void>;
}
