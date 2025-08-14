import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { CreateMedicalRecordConditionDto } from "src/medical_record_conditions/dto/create-medical_record_condition.dto";
import { CreateTreatmentDto } from "src/treatments/dto/create-treatment.dto";

/**
 * DTO para la creación de historiales medicos
 * Define y valida los datos necesarios para crear un historial medico
 */
export class CreateMedicalRecordDto {
    @ApiProperty({
        example: 'b6d5a9c7-3a0d-4c5a-b8a6-0c84a2e00a3b',
        description: 'ID del paciente'
    })
    @IsUUID()
    patientId: string;

    @ApiProperty({ 
        description: 'Lista de padecimientos medicos del paciente',
        type: [CreateMedicalRecordConditionDto],
        required: false, 
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMedicalRecordConditionDto)
    conditions?: CreateMedicalRecordConditionDto[];

    @ApiProperty({
        description: 'Lista de tratamientos del historial',
        type: [CreateTreatmentDto],
        required: false
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTreatmentDto)
    treatments?: CreateTreatmentDto[];

}