import { Payment } from "src/payments/payment.entity";
import { Treatment } from "src/treatments/treatment.entity";
export declare class Procedure {
    id: string;
    treatment: Treatment;
    date: Date;
    description: string;
    payment: Payment;
    createdAt: Date;
}
