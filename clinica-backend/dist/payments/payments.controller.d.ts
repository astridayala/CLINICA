import { PaymentsService } from './payments.service';
import { CreatePaymentsDto } from './dto/create-payments.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentsDto: CreatePaymentsDto): Promise<import("./payment.entity").Payment>;
    findAll(): Promise<import("./payment.entity").Payment[]>;
    findOne(id: string): Promise<import("./payment.entity").Payment>;
    remove(id: string): Promise<boolean>;
}
