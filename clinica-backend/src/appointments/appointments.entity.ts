import { Patient } from "src/patients/patient.entity";
import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad Citas
 * Representa a las citas de los pacientes
 */
@Entity('appointment')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' } )
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({
        type: 'timestamp',
        transformer: {
            to: (value: string) => value,
            from: (value: Date) => {      
                if(!value) return value;
                const date = new Date(value);
                const pad = (n) => n < 10 ? '0' + n : n;
                return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            }
        }
    })
    start: string

    @Column({
        type: 'timestamp',
        transformer: {
            to: (value: string) => value,
            from: (value: Date) => {
                if(!value) return value;
                const date = new Date(value);
                const pad = (n) => n < 10 ? '0' + n : n;
                return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            }
        }
    })
    end: string;

    @Column({ nullable: true, name: 'notes' })
    description: string

    @ManyToOne(() => User, (user) => user.appointments, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: User;

    @Column({ nullable: true })
    doctorId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
