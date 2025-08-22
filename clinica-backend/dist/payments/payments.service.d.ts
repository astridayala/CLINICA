import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentsDto } from './dto/create-payments.dto';
export declare class PaymentsService {
    private paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    create(createPaymentsDto: CreatePaymentsDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    remove(id: string): Promise<boolean>;
}
