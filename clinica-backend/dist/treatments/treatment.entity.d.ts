import { MedicalRecord } from "../medical_record/medical_record.entity";
import { TreatmentType } from "../treatments_types/treatment_type.entity";
import { Procedure } from "../procedures/procedure.entity";
import { TreatmentStatus } from "../treatment_statuses/treatment_status.entity";
export declare class Treatment {
    id: string;
    medicalRecord: MedicalRecord;
    treatmentType: TreatmentType;
    totalPrice: number;
    procedures: Procedure[];
    status: TreatmentStatus;
    createdAt: Date;
}
