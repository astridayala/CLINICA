import { TreatmentsTypesService } from './treatments_types.service';
import { CreateTreatmentTypesDto } from './dto/create-treatments_types.dto';
export declare class TreatmentsTypesController {
    private readonly treatmentsTypesService;
    constructor(treatmentsTypesService: TreatmentsTypesService);
    create(createTreatmentTypesDto: CreateTreatmentTypesDto): Promise<import("./treatment_type.entity").TreatmentType>;
    findAll(): Promise<import("./treatment_type.entity").TreatmentType[]>;
    findOne(id: string): Promise<import("./treatment_type.entity").TreatmentType>;
    remove(id: string): Promise<boolean>;
}
