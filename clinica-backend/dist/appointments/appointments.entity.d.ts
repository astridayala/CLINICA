import { Patient } from "src/patients/patient.entity";
export declare class Appointment {
    id: string;
    patient: Patient;
    startTime: Date;
    endTime: Date;
    notes: string;
    createdAt: Date;
}
