import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedures.dto';
export declare class ProceduresController {
    private readonly proceduresService;
    constructor(proceduresService: ProceduresService);
    create(createProceduresDto: CreateProcedureDto): Promise<import("./procedure.entity").Procedure>;
    findAll(): Promise<import("./procedure.entity").Procedure[]>;
    findOne(id: string): Promise<import("./procedure.entity").Procedure>;
    remove(id: string): Promise<boolean>;
}
