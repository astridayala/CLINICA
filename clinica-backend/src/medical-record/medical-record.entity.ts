import { Patient } from "src/patients/patient.entity";
import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalRecordCondition } from "src/medical-record-conditions/medical-record-condition.entity";
import { Treatment } from "src/treatments/treatment.entity";

/**
 * Entidad Historial Medico
 * Representa a todos los historiales de los pacientes
 */
@Entity()
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id:number;
    
    @OneToOne(() => Patient, patient => patient.medicalRecord)
    patient: Patient;

    @OneToMany(() => MedicalRecordCondition, mrc => mrc.medicalRecord, { cascade: true })
    conditions: MedicalRecordCondition[];

    @OneToMany(() => Treatment, treatment => treatment.medicalRecord, { cascade:true })
    treatments: Treatment[];

    @CreateDateColumn()
    createdAt: Date;
}
