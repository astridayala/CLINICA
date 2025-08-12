import { Payment } from "src/payments/payment.entity";
import { Treatment } from "src/treatments/treatment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Procedure {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Treatment, treatment => treatment.procedures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'treatment-id' })
    treatment: Treatment;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => Payment, payment => payment.procedure, { cascade: true })
    payments: Payment[];
    
    @CreateDateColumn()
    createdAt: Date;
}
