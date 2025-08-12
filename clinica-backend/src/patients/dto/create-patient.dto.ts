import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches } from "class-validator";
import { CreateDateColumn } from "typeorm";

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
    lastname: string;

    @IsOptional()
    @ApiProperty({ example: '+50312234556', description: 'Celular del paciente' })
    @IsPhoneNumber('SV', { message: 'El celular debe ser un número válido de El Salvador' })
    celular?: string;

    @IsOptional()
    @ApiProperty({ example: 'astriayala@gmail.com', description: 'Email del paciente' })
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    email?: string

    @ApiProperty({ example: '31/12/2000', description: 'Fecha de nacimiento (dd/mm/yyyy)' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @IsString({ message: 'La fecha debe ser una cadena de texto' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha debe tener el formato dd/mm/yyyy',
    })
    birthDate: string;

    @ApiProperty({
        example: 'patient',
        description: 'Sexo del paciente',
        enum: ['femenino', 'masculino'],
        default: 'masculino'
    })
    @IsEnum(['femenino', 'masculino'], { message: 'El sexo debe ser masculino o femenino' })
    @IsNotEmpty({ message: 'El sexo es requerido' })
    gender: string

    @IsOptional()
    @ApiProperty({ example: 'km 12 ½ carretera al Puerto de La Libertad, calle nueva a Comasagua, Santa Tecla, La Libertad', description: 'Dirección del paciente' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    address?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}