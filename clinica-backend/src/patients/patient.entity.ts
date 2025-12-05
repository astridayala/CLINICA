import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalRecord } from "../medical_record/medical_record.entity";
import { Appointment } from "../appointments/appointments.entity";
import { User } from "../users/users.entity";

/**
 * Entidad Paciente
 * Representa a todos los paciente del sistema
 */
@Entity('patient')
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
    medicalRecord: MedicalRecord;
    
    @OneToMany(() => Appointment, appointment => appointment.patient, { cascade: true })
    appointments: Appointment[];

    @ManyToOne(() => User, (user) => user.patients, { eager: false, onDelete: 'CASCADE' })
    doctor: User;
    
    @Column({ nullable: true })
    doctorId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
}
