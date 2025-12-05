import { MedicalRecord } from "src/medical_record/medical_record.entity";
import { Appointment } from "src/appointments/appointments.entity";
import { User } from "src/users/users.entity";
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
    appointments: Appointment[];
    doctor: User;
    doctorId: string;
    createdAt: Date;
}
