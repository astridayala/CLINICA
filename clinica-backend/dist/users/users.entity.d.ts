import { Patient } from "../patients/patient.entity";
export declare class User {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    patients: Patient[];
    appointments: Patient[];
    createdAt: Date;
}
