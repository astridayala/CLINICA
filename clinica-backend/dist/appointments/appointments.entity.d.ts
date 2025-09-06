import { Patient } from "src/patients/patient.entity";
export declare class Appointment {
    id: string;
    patient: Patient;
    start: Date;
    end: Date;
    description: string;
    createdAt: Date;
}
