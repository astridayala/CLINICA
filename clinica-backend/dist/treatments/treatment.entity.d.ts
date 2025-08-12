import { MedicalRecord } from "src/medical-record/medical-record.entity";
import { TreatmentType } from "src/treatments-types/treatment-type.entity";
import { Procedure } from "src/procedures/procedure.entity";
export declare class Treatment {
    id: number;
    medicalRecord: MedicalRecord;
    treatmentType: TreatmentType;
    totalPrice: number;
    startDate: Date;
    status: string;
    procedures: Procedure[];
    createdAt: Date;
}
