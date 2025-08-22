import { TreatmentStatus } from './treatment_status.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentStatusDto } from './dto/create-treatment_statuses.dto';
export declare class TreatmentStatusesService {
    private treatmentStatusRepository;
    constructor(treatmentStatusRepository: Repository<TreatmentStatus>);
    create(createTreatmentStatusDto: CreateTreatmentStatusDto): Promise<TreatmentStatus>;
    findAll(): Promise<TreatmentStatus[]>;
    findOne(id: string): Promise<TreatmentStatus>;
    remove(id: string): Promise<boolean>;
}
