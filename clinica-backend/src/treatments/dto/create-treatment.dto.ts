import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from "class-validator";

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

    @IsOptional()
    @ApiProperty({ example: '2025-12-02', description: 'Fecha de inicio (YYYY-MM-DD)' })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato YYYY-MM-DD requerido' })
    date?: string;
}
