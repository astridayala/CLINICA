import { Exclude } from "class-transformer";
import { Patient } from "src/patients/patient.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad Usuario
 * Representa a los usuarios del sistema de analítica
 * Roles disponibles: admin, doctor
 */
@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'doctor'],
        default: 'doctor'
    })
    role: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Patient, (patient) => patient.doctor)
    patients: Patient[];

    @OneToMany(() => Patient, (patient) => patient.doctor)
    appointments: Patient[];
    
    @CreateDateColumn()
    createdAt: Date;
}
