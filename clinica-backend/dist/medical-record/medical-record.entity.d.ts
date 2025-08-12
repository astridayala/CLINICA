import { Patient } from "src/patients/patient.entity";
import { MedicalRecordCondition } from "src/medical-record-conditions/medical-record-condition.entity";
import { Treatment } from "src/treatments/treatment.entity";
export declare class MedicalRecord {
    id: number;
    patient: Patient;
    conditions: MedicalRecordCondition[];
    treatments: Treatment[];
    createdAt: Date;
}
