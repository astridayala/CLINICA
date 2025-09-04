import { Procedure } from './procedure.entity';
import { Repository } from 'typeorm';
import { CreateProcedureDto } from './dto/create-procedures.dto';
export declare class ProceduresService {
    private procedureRepository;
    constructor(procedureRepository: Repository<Procedure>);
    create(createProceduresDto: CreateProcedureDto): Promise<Procedure>;
    findAll(): Promise<Procedure[]>;
    findOne(id: string): Promise<Procedure>;
    remove(id: string): Promise<boolean>;
}
