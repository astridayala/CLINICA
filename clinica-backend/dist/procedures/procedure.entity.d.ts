import { Payment } from "../payments/payment.entity";
import { Treatment } from "../treatments/treatment.entity";
export declare class Procedure {
    id: string;
    treatment: Treatment;
    date: Date;
    description: string;
    payment: Payment;
    createdAt: Date;
}
