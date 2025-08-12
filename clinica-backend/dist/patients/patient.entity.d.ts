import { MedicalRecord } from "src/medical_record/medical_record.entity";
export declare class Patient {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: Date;
    gender: string;
    address: string;
    medicalRecord: MedicalRecord;
    createdAt: Date;
}
