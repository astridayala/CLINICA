import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

/**
 * DTO para la creacion de pagos
 * Define y valida los datos necesarios para crear un nuevo pago
 */
export class CreatePaymentsDto {
    @ApiProperty({
        description: 'ID del procedimiento al que pertenece el pago',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    @IsNotEmpty({ message: 'El procedimiento del tratamiento es requerido' })
    procedureId: string;

    @ApiProperty({
        description: 'Fecha del pago (YYYY-MM-DD)',
        example: '2025-08-21',
    })
    @IsNotEmpty({ message: 'La fecha de pago es requerida' })
    @IsDate({ message: 'La fecha de pago debe ser una fecha válida' })
    @Type(() => Date)
    date: string;

    @ApiProperty({
        description: 'Monto del pago',
        example: 120.50,
    })
    @IsNotEmpty({ message: 'El monto del pago es requerido' })
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;
}