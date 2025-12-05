import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentsDto } from './dto/appointments.dto';
import { User } from '../users/users.entity';

/**
 * Servicio para gestionar las citas de los pacientes
 * Proporciona metodos para crear, buscar, actualizar y eliminar las citas
 */
@Injectable()
export class AppointmentsService {  
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>
    ) {}

    /**
     * Crea una cita
     * @param createAppointmentsDto - Datos de la cita
     * @returns La cita creada
     */
    async create(createAppointmentsDto: CreateAppointmentsDto, user: User): Promise<Appointment> {
        const { patientId, start, end, description } = createAppointmentsDto;
        const newAppointment = this.appointmentsRepository.create({
            patient: { id: patientId },
            doctor: user,
            start,
            end,
            description
        })

        return this.appointmentsRepository.save(newAppointment)
    }

    /**
     * Busca todas las citas
     * @returns Lista de citas
     */
    async findAll(user: User): Promise<Appointment[]> {
        const query: any = {
            relations: ['patient'],
            order: { start: 'ASC' } 
        };

        // Si NO es admin, filtramos para que solo traiga las citas de ESTE doctor
        if (user.role !== 'admin') {
            query.where = { doctor: { id: user.id } };
        }

        return await this.appointmentsRepository.find(query);
    }

    /**
     * Busca una cita por su ID
     * @param id - ID de la cita
     * @returns La cita encontrado
     */
    async findOne(id: string, user: User): Promise<Appointment> {
        const query: any = {
            where: { id },
            relations: ['patient']
        };

        // Validación de seguridad
        if (user.role !== 'admin') {
            query.where.doctor = { id: user.id };
        }

        const appointment = await this.appointmentsRepository.findOne(query);

        if (!appointment) {
            throw new NotFoundException('Cita no encontrada o no tienes acceso a ella');
        }
        return appointment;
    }

    /**
     * Busca las citas de un paciente
     * @param patientId - ID del paciente
     * @returns Las citas de un paciente
     */
    async findByPatient(patientId: string, user: User): Promise<Appointment[]> {
        const query: any = {
            where: { patient: { id: patientId } },
            relations: ['patient'],
            order: { start: 'ASC' }
        };

        // El doctor solo ve las citas que ÉL tiene con este paciente
        // (No ve las citas que el paciente tiene con OTROS doctores)
        if (user.role !== 'admin') {
            query.where.doctor = { id: user.id };
        }

        const appointments = await this.appointmentsRepository.find(query);

        if (!appointments || appointments.length === 0) {
            // No lanzamos error 404 aquí, mejor devolver array vacío si no hay historial con este doctor
            return []; 
        }

        return appointments;
    }

    /**
     * Elimina un cita
     * @param id - ID de la cita
     * @returns true si se elimino correctamente
     */
    async remove(id: string, user: User): Promise<{ message: string }> {
        const whereCondition: any = { id };

        // Solo puede borrar si es suya (o si es admin)
        if (user.role !== 'admin') {
            whereCondition.doctor = { id: user.id };
        }

        // Usamos delete con condiciones para asegurar que solo borre si coincide ID y Doctor
        const result = await this.appointmentsRepository.delete(whereCondition);

        if (result.affected === 0) {
            throw new NotFoundException(`La cita con ID ${id} no existe o no tienes permiso para eliminarla`);
        }

        return { message: `La cita con id ${id}, fue eliminada correctamente` };
    }
    
}
