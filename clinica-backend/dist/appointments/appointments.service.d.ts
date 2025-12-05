import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentsDto } from './dto/appointments.dto';
import { User } from '../users/users.entity';
export declare class AppointmentsService {
    private appointmentsRepository;
    constructor(appointmentsRepository: Repository<Appointment>);
    create(createAppointmentsDto: CreateAppointmentsDto, user: User): Promise<Appointment>;
    findAll(user: User): Promise<Appointment[]>;
    findOne(id: string, user: User): Promise<Appointment>;
    findByPatient(patientId: string, user: User): Promise<Appointment[]>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
}
