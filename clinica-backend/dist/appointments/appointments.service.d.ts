import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentsDto } from './dto/appointments.dto';
export declare class AppointmentsService {
    private appointmentsRepository;
    constructor(appointmentsRepository: Repository<Appointment>);
    create(createAppointmentsDto: CreateAppointmentsDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    findByPatient(patientId: string): Promise<Appointment[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
