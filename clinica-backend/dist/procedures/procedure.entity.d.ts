import { Payment } from "src/payments/payment.entity";
import { Treatment } from "src/treatments/treatment.entity";
export declare class Procedure {
    id: number;
    treatment: Treatment;
    date: Date;
    description: string;
    payments: Payment[];
    createdAt: Date;
}
