import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { Procedure } from '../procedures/procedure.entity';

/**
 * Servicio para gestionar los pagos
 * Proporciona metodos para crear, buscar, actualizar y eliminar los pagos
 */
@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,

        @InjectRepository(Procedure)
    private proceduresRepository: Repository<Procedure>,
    ) {}

    /**
     * Crea un nuevo pago
     * @param createPaymentsDto - DTO del pago
     * @returns El pago creado
     */
    async create(createPaymentsDto: CreatePaymentsDto): Promise<Payment> {
        const { procedureId, date, amount } = createPaymentsDto;

        const procedure = await this.proceduresRepository.findOne({
            where: { id: procedureId },
        });

        if (!procedure) {
        throw new NotFoundException('El procedimiento no existe');
        }

        const payment = this.paymentsRepository.create({
            date: date, 
            amount: amount,
            procedure: procedure,
        });

        return await this.paymentsRepository.save(payment);
    }
    

    /**
     * Busca todos los pagos
     * @returns Lista de pagos
     */
    async findAll(): Promise<Payment[]> {
        return this.paymentsRepository.find()
    }

    /**
     * Busca un pago por su ID
     * @param id - ID del pago
     * @returns El pago encontrado
     */
    async findOne(id: string): Promise<Payment> {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['procedure']
        });

        if (!payment) throw new NotFoundException(`Pago con id ${id} no encontrado`);

        return payment;
    }

    /**
     * Elimina un pago
     * @param id - ID del pago
     * @returns true si se elimina correctamente
     */
    async remove(id: string): Promise<{ message: string }> {
        const payment = await this.paymentsRepository.delete(id);

        if (payment.affected === 0) {
            throw new NotFoundException(`Pago con id ${id} no encontrado`);
        }

        return { message: `El pago con id ${id} fue eliminado correctamente` };
    }
}
