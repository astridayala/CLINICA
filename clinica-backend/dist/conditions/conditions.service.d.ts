import { Condition } from './condition.entity';
import { Repository } from 'typeorm';
import { CreateConditionDto } from './dto/create-condition.dto';
export declare class ConditionsService {
    private conditionsRepository;
    constructor(conditionsRepository: Repository<Condition>);
    create(createConditionDto: CreateConditionDto): Promise<Condition>;
    findAll(): Promise<Condition[]>;
    finOne(id: string): Promise<Condition>;
    remove(id: string): Promise<boolean>;
}
