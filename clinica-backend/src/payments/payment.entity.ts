import { Procedure } from "src/procedures/procedure.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Procedure, procedure => procedure.payments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'procedure-id' })
    procedure: Procedure;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;
}
