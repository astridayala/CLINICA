import { Patient } from "../patients/patient.entity";
import { MedicalRecordCondition } from "../medical_record_conditions/medical_record_condition.entity";
import { Treatment } from "../treatments/treatment.entity";
export declare class MedicalRecord {
    id: string;
    patient: Patient;
    notes: string;
    conditions: MedicalRecordCondition[];
    treatments: Treatment[];
    createdAt: Date;
}
