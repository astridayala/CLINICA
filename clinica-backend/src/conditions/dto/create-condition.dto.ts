import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateMedicalRecordConditionDto } from "src/medical_record_conditions/dto/create-medical_record_condition.dto";

/**
 * DTO para la creacion de padecimientos o condiciones
 * Define y valida los datos necesarios para crear un padecimiento
 */
export class CreateConditionDto {
    @ApiProperty({ example: 'Ninguna', description: 'Nombre del padecimiento del paciente' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El padecimiento es requerido' })
    name: string;

    @ApiProperty({ 
        description: 'Historial - Condicion del paciente',
        type: [CreateMedicalRecordConditionDto],
        required: false, 
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMedicalRecordConditionDto)
    medicalRecord?: CreateMedicalRecordConditionDto[];
}