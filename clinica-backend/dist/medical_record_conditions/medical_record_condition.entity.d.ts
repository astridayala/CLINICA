import { Condition } from "src/conditions/condition.entity";
import { MedicalRecord } from "src/medical_record/medical_record.entity";
export declare class MedicalRecordCondition {
    id: string;
    medicalRecord: MedicalRecord;
    condition: Condition;
}
