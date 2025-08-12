import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalRecord } from "src/medical-record/medical-record.entity";

/**
 * Entidad Paciente
 * Representa a todos los paciente del sistema
 */
@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    email: string

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({
        type: 'enum',
        enum: ['femenino', 'masculino']
    })
    gender: string

    @Column({ nullable: true, type: 'text' })
    address: string

    @OneToOne(() => MedicalRecord, record => record.patient, { cascade:true })
    @JoinColumn()
    medicalRecord: MedicalRecord;

    @CreateDateColumn()
    createdAt: Date;
    
}
