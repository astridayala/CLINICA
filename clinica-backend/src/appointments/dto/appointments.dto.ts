import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

export class CreateAppointmentsDto {
    @ApiProperty({ example: 'b5d6c9b4-1234-5678-9101-abcdef123456', description: 'ID del paciente' })
    @IsNotEmpty({ message: 'El paciente es obligatorio' })
    @IsUUID('4', { message: 'El ID del paciente debe ser un UUID válido' })
    patientId: string;
    
    @ApiProperty({ example: '2025-09-03 10:00', description: 'YYYY-MM-DD HH:mm' })
    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, { message: 'El formato debe ser YYYY-MM-DD HH:mm' })
    start: string; 

    @ApiProperty({ example: '2025-09-03 11:00', description: 'YYYY-MM-DD HH:mm' })
    @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, { message: 'El formato debe ser YYYY-MM-DD HH:mm' })
    end: string; 

    @IsOptional()
    @ApiProperty({ example: 'Limpieza dental', description: 'Descripción' })
    @IsString()
    description?: string
}