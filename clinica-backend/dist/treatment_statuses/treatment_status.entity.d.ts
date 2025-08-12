import { Treatment } from "src/treatments/treatment.entity";
export declare class TreatmentStatus {
    id: number;
    name: string;
    color: string;
    orderPriority: number;
    treatments: Treatment[];
}
