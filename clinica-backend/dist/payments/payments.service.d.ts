import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { Procedure } from '../procedures/procedure.entity';
export declare class PaymentsService {
    private paymentsRepository;
    private proceduresRepository;
    constructor(paymentsRepository: Repository<Payment>, proceduresRepository: Repository<Procedure>);
    create(createPaymentsDto: CreatePaymentsDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
