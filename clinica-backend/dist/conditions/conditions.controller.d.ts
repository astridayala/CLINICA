import { ConditionsService } from './conditions.service';
import { CreateConditionDto } from './dto/create-condition.dto';
export declare class ConditionsController {
    private readonly conditionsService;
    constructor(conditionsService: ConditionsService);
    create(createConditionDto: CreateConditionDto): Promise<import("./condition.entity").Condition>;
    findAll(): Promise<import("./condition.entity").Condition[]>;
    findOne(id: string): Promise<import("./condition.entity").Condition>;
    remove(id: string): Promise<boolean>;
}
