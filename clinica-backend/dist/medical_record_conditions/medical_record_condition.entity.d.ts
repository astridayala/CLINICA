import { Condition } from "../conditions/condition.entity";
import { MedicalRecord } from "../medical_record/medical_record.entity";
export declare class MedicalRecordCondition {
    id: string;
    medicalRecord: MedicalRecord;
    condition: Condition;
}
