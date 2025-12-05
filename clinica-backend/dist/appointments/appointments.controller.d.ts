import { AppointmentsService } from './appointments.service';
import { CreateAppointmentsDto } from './dto/appointments.dto';
import { User } from 'src/users/users.entity';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentsDto: CreateAppointmentsDto, user: User): Promise<import("./appointments.entity").Appointment>;
    findAll(user: User): Promise<import("./appointments.entity").Appointment[]>;
    findOne(id: string, user: User): Promise<import("./appointments.entity").Appointment>;
    findByPatient(patientId: string, user: User): Promise<import("./appointments.entity").Appointment[]>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
}
