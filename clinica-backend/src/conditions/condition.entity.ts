import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalRecordCondition } from "src/medical-record-conditions/medical-record-condition.entity";

/**
 * Entidad Historial Medico
 * Representa a todos los historiales de los pacientes
 */
@Entity()
export class Condition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => MedicalRecordCondition, mrc => mrc.condition)
    medicalRecordConditions: MedicalRecordCondition[];
}
