import { MedicalRecord } from "src/medical-record/medical-record.entity";
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
