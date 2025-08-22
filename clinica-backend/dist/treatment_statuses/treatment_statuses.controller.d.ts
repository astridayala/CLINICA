import { TreatmentStatusesService } from './treatment_statuses.service';
import { CreateTreatmentStatusDto } from './dto/create-treatment_statuses.dto';
export declare class TreatmentStatusesController {
    private readonly treatmentStatusesService;
    constructor(treatmentStatusesService: TreatmentStatusesService);
    create(createTreatmentStatusDto: CreateTreatmentStatusDto): Promise<import("./treatment_status.entity").TreatmentStatus>;
    findAll(): Promise<import("./treatment_status.entity").TreatmentStatus[]>;
    findOne(id: string): Promise<import("./treatment_status.entity").TreatmentStatus>;
    remove(id: string): Promise<boolean>;
}
