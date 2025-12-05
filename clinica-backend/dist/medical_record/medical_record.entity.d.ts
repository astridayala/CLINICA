import { Patient } from "src/patients/patient.entity";
import { MedicalRecordCondition } from "src/medical_record_conditions/medical_record_condition.entity";
import { Treatment } from "src/treatments/treatment.entity";
export declare class MedicalRecord {
    id: string;
    patient: Patient;
    notes: string;
    conditions: MedicalRecordCondition[];
    treatments: Treatment[];
    createdAt: Date;
}
