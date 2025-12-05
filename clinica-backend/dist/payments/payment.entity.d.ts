import { Procedure } from "../procedures/procedure.entity";
export declare class Payment {
    id: string;
    procedure: Procedure;
    date: Date;
    amount: number;
    createdAt: Date;
}
