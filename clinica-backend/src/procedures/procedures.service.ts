import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from './procedure.entity';
import { Repository } from 'typeorm';

/**
 * Servicio para gestionar los procedimientos
 * Proporciona metodos para crear, buscar, actualizar y eliminar los procedimientos
 */
@Injectable()
export class ProceduresService {
    constructor(
        @InjectRepository(Procedure)
        private procedureRepository: Repository<Procedure>
    ) {}

    /**
     * 
     */
}
