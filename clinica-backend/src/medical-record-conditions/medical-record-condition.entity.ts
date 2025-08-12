import { Condition } from "src/conditions/condition.entity";
import { MedicalRecord } from "src/medical-record/medical-record.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicalRecordCondition {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MedicalRecord, record => record.conditions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'medical-record-id' })
    medicalRecord: MedicalRecord;

    @ManyToOne(() => Condition, condition => condition.medicalRecordConditions, { onDelete: 'CASCADE' })
    @JoinColumn({ name:'condition-id' })
    condition: Condition;
}
