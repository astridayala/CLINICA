import { Treatment } from "../treatments/treatment.entity";
export declare class TreatmentStatus {
    id: string;
    name: string;
    orderPriority: number;
    treatments: Treatment[];
}
