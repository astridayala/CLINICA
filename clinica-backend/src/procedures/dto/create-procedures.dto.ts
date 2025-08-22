import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

/**
 * DTO para la creacion de procedimientos
 * Define y valida los datos necesarios para crear un nuevo procedimiento
 */
export class CreateProcedureDto {
    @ApiProperty({
        description: 'ID del tratamiento al que pertenece el procedimiento',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    @IsNotEmpty({ message: 'El ID del tratamiento es requerido' })
    treatmentId: string;

    @ApiProperty({
        description: 'Fecha del procedimiento',
        example: '21/08/2025',
    })
    @IsNotEmpty({ message: 'La fecha del procedimiento es requerida' })
    @IsString({ message: 'La fecha debe ser una cadena de texto' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha debe tener el formato dd/mm/yyyy',
    })
    date: string;

    @IsOptional()
    @ApiProperty({
        description: 'Descripción del procedimiento realizado',
        example: 'Limpieza dental completa con ultrasonido',
    })
    description?: string;

}