import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Treatment } from "src/treatments/treatment.entity";

@Entity()
export class TreatmentType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Treatment, treatment => treatment.treatmentType)
    treatments: Treatment[];
}
