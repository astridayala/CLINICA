import { Procedure } from "src/procedures/procedure.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad Payments
 * Representa el pago que se realiza para un procedimiento específico
 */
@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Procedure, procedure => procedure.payment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'procedure_id' })
    procedure: Procedure;

    @Column({ type: 'date' })
    date: Date;

    /**
     *  @ApiProperty({ example: '31/12/2000', description: 'Fecha de nacimiento (dd/mm/yyyy)' })
        @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
        @IsString({ message: 'La fecha debe ser una cadena de texto' })
        @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
            message: 'La fecha debe tener el formato dd/mm/yyyy',
        })
        birthDate: string;
     */

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
