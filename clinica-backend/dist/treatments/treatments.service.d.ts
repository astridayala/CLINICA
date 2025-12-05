import { Treatment } from './treatment.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { TreatmentStatus } from '../treatment_statuses/treatment_status.entity';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
export declare class TreatmentsService {
    private treatmentRepository;
    private treatmentStatusRepository;
    constructor(treatmentRepository: Repository<Treatment>, treatmentStatusRepository: Repository<TreatmentStatus>);
    create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment>;
    findAll(): Promise<Treatment[]>;
    findOne(id: string): Promise<Treatment>;
    remove(id: string): Promise<{
        message: string;
    }>;
    update(id: string, updateTreatmentDto: UpdateTreatmentDto): Promise<Treatment>;
}
