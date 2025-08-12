import { MedicalRecordCondition } from "src/medical_record_conditions/medical_record_condition.entity";
export declare class Condition {
    id: number;
    name: string;
    medicalRecordConditions: MedicalRecordCondition[];
}
