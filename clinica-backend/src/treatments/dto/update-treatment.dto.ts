import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateTreatmentDto {
    @ApiProperty({
        description: 'ID del nuevo estado del tratamiento',
        example: '550e8400-e29b-41d4-a716-446655440222'
    })
    @IsOptional()
    @IsUUID()
    statusId?: string;    
}