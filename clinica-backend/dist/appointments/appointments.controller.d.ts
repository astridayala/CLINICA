import { AppointmentsService } from './appointments.service';
import { CreateAppointmentsDto } from './dto/appointments.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentsDto: CreateAppointmentsDto): Promise<import("./appointments.entity").Appointment>;
    findAll(): Promise<import("./appointments.entity").Appointment[]>;
    findOne(id: string): Promise<import("./appointments.entity").Appointment>;
    appointmentsByPatient(patientId: string): Promise<import("./appointments.entity").Appointment[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
