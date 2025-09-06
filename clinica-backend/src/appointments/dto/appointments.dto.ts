import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, Min } from "class-validator";

/**
 * DTO para la creacion de citas
 * Define y valida los datos necesarios para crear una cita
 */
export class CreateAppointmentsDto {
    @ApiProperty({ example: 'b5d6c9b4-1234-5678-9101-abcdef123456', description: 'ID del paciente' })
    @IsNotEmpty({ message: 'El paciente es obligatorio' })
    @IsUUID('4', { message: 'El ID del paciente debe ser un UUID válido' })
    patientId: string;
    
    @ApiProperty({
        example: '2025-09-03 10:00',
        description: 'Fecha y hora de inicio (YYYY-MM-DD HH:mm, 24h)',
    })
    @IsNotEmpty({ message: 'La fecha y hora de inicio son obligatorias' })
    @Matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d)$/,
        { message: 'La fecha debe tener el formato YYYY-MM-DD HH:mm en 24 horas' },
    )
    @Type(() => Date)
    start: Date;

    @ApiProperty({
        example: '2025-09-03 11:00',
        description: 'Fecha y hora de fin (YYYY-MM-DD HH:mm, 24h)',
    })
    @IsNotEmpty({ message: 'La fecha y hora de fin son obligatorias' })
    @Matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d)$/,
        { message: 'La fecha debe tener el formato YYYY-MM-DD HH:mm en 24 horas' },
    )
    @Type(() => Date)
    end: Date;

    @IsOptional()
    @ApiProperty({ example: 'Retiro de brackets', description: 'Informacion adicional necesaria' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    description?: string
}