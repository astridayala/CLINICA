import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from "class-validator";

/**
 * DTO para la creación de tratamientos
 * Define y valida los datos necesarios para crear un nuevo tratamiento
 */
export class CreateTreatmentDto {
    @ApiProperty({
        description: 'ID del historial medico del paciente',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    @IsNotEmpty({ message: 'El historial medico es requerido' })
    medicalRecordId: string;

    @ApiProperty({
        description: 'ID del tipo de tratamiento',
        example: '550e8400-e29b-41d4-a716-446655440111',
    })
    @IsUUID()
    @IsNotEmpty({ message: 'El tipo de tratamiento es requerido' })
    treatmentTypeId: string;

    @ApiProperty({
        description: 'Precio total del tratamiento',
        example: 1199.99,
    })
    @IsNumber({}, { message: 'El precio debe ser un numero' })
    @IsNotEmpty({ message: 'El precio es requerido' })
    totalPrice: number;

    @ApiProperty({
        description: 'Fecha de inicio del tratamiento (dd/mm/yyyy)',
        example: '19/08/2025'
    })
    @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
    @IsString({ message: 'La fecha debe ser una cadena de texto' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha debe tener el formato dd/mm/yyyy',
    })
    startDate: string;

    @ApiProperty({
        description: 'ID del estado de tratamiento',
        example: '550e8400-e29b-41d4-a716-446655440222'
    })
    @IsUUID()
    @IsNotEmpty({ message: 'El estado del tratamiento es requerido' })
    statusId: string;
}
