import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

/**
 * DTO para la creación de pacientes
 * Define y valida los datos necesarios para crear un paciente
 */
export class CreatePatientDto {
    @ApiProperty({ example: 'Astrid Violeta', description: 'Nombres del paciente' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiProperty({ example: 'Ayala Ayala', description: 'Apellidos del paciente' })
    @IsString({ message: 'El Apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El Apellido es requerido' })
    lastName: string;

    @IsOptional()
    @ApiProperty({ 
        example: '7777-7777', 
        description: 'Celular del paciente (texto libre)', 
    })
    @IsString({ message: 'El celular debe ser una cadena de texto' })
    phone?: string;

    @ApiProperty({ example: 'astriayala@gmail.com', description: 'Email del paciente' })
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({ example: '2000-12-31', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    birthDate: string;

    @ApiProperty({
        example: 'femenino',
        description: 'Genero del paciente',
        enum: ['femenino', 'masculino'],
    })
    @IsEnum(['femenino', 'masculino'], { message: 'El sexo debe ser masculino o femenino' })
    @IsNotEmpty({ message: 'El sexo es requerido' })
    gender: string

    @IsOptional()
    @ApiProperty({ example: 'km 12 ½ carretera al Puerto de La Libertad...', description: 'Dirección del paciente' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    address?: string
}