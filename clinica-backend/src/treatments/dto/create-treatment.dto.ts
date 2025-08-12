import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

/**
 * DTO para la creación de tratamientos
 * Define y valida los datos necesarios para crear un nuevo tratamiento
 */
export class CreateTreatmentDto {
    @ApiProperty({ example: '' })

    @ApiProperty({
            example: 'activo',
            description: 'Tipo de tratamiento',
            enum: ['femenino', 'masculino'],
            default: 'masculino'
        })
    @IsEnum(['femenino', 'masculino'], { message: 'El sexo debe ser masculino o femenino' })
    @IsNotEmpty({ message: 'El sexo es requerido' })
    gender: string
}
