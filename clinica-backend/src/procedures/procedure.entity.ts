import { Payment } from "src/payments/payment.entity";
import { Treatment } from "src/treatments/treatment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('procedure')
export class Procedure {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Treatment, treatment => treatment.procedures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'treatment_id' })
    treatment: Treatment;

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

    @Column({ type: 'text' })
    description: string;

    @OneToOne(() => Payment, payment => payment.procedure, { cascade: true })
    payment: Payment;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
