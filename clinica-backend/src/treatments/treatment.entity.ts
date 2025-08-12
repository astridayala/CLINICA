import { MedicalRecord } from "src/medical-record/medical-record.entity";
import { TreatmentType } from "src/treatments-types/treatment-type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Procedure } from "src/procedures/procedure.entity";

@Entity()
export class Treatment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MedicalRecord, record => record.treatments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'medical-record-id' })
    medicalRecord: MedicalRecord;

    @ManyToOne(() => TreatmentType, type => type.treatments)
    @JoinColumn({ name: 'treatment-type-id' })
    treatmentType: TreatmentType

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @Column()
    startDate: Date;

    @Column({
        name: 'treatment-data',
        type: 'enum',
        enum: ['activo, finalizado']
    })
    status: string

    @OneToMany(() => Procedure, procedure => procedure.treatment, { cascade: true })
    procedures: Procedure[];

    @CreateDateColumn()
    createdAt: Date;
}
