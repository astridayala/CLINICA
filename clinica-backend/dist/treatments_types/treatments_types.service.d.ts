import { TreatmentType } from './treatment_type.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentTypesDto } from './dto/create-treatments_types.dto';
export declare class TreatmentsTypesService {
    private treatmentsTypeRepository;
    constructor(treatmentsTypeRepository: Repository<TreatmentType>);
    create(createTreatmentTypesDto: CreateTreatmentTypesDto): Promise<TreatmentType>;
    findAll(): Promise<TreatmentType[]>;
    findOne(id: string): Promise<TreatmentType>;
    remove(id: string): Promise<boolean>;
}
