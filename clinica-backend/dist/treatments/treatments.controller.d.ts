import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
export declare class TreatmentsController {
    private readonly treatmentsService;
    constructor(treatmentsService: TreatmentsService);
    create(createTreatmentDto: CreateTreatmentDto): Promise<import("./treatment.entity").Treatment>;
    findAll(): Promise<import("./treatment.entity").Treatment[]>;
    findOne(id: string): Promise<import("./treatment.entity").Treatment>;
    remove(id: string): Promise<boolean>;
}
