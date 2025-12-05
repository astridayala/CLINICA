import { Patient } from "src/patients/patient.entity";
import { User } from "src/users/users.entity";
export declare class Appointment {
    id: string;
    patient: Patient;
    start: string;
    end: string;
    description: string;
    doctor: User;
    doctorId: string;
    createdAt: Date;
}
