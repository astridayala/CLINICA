import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from "class-validator";

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
        description: 'Fecha de pago (dd/mm/yyyy)',
        example: '21/08/2025'
    })
    @IsNotEmpty({ message: 'La fecha de pago es requerida' })
    @IsString({ message: 'La fecha debe ser una cadena de texto' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha debe tener el formato dd/mm/yyyy',
    })
    date: string;

    @ApiProperty({
        description: 'Monto del pago',
        example: 120.50,
    })
    @IsNotEmpty({ message: 'El monto del pago es requerido' })
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;
}