import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Procedure } from '../procedures/procedure.entity';

/**
 * Modulo para los pagos
 * Configura el repositorio y servicios relacionados con los pagos
 */
@Module({
  imports: [TypeOrmModule.forFeature([Payment, Procedure])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService]
})
export class PaymentsModule {}
