import { MedicalRecord } from "src/medical_record/medical_record.entity";
import { TreatmentType } from "src/treatments_types/treatment_type.entity";
import { Procedure } from "src/procedures/procedure.entity";
import { TreatmentStatus } from "src/treatment_statuses/treatment_status.entity";
export declare class Treatment {
    id: string;
    medicalRecord: MedicalRecord;
    treatmentType: TreatmentType;
    totalPrice: number;
    startDate: Date;
    procedures: Procedure[];
    status: TreatmentStatus;
    createdAt: Date;
}
