"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchemaClinica20250812123045 = void 0;
class InitialSchemaClinica20250812123045 {
    name = 'InitialSchemaClinica20250812123045';
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM ('admin', 'doctor');`);
        await queryRunner.query(`CREATE TYPE "patient_gender_enum" AS ENUM ('femenino', 'masculino');`);
        await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" VARCHAR NOT NULL UNIQUE,
        "name" VARCHAR NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'doctor',
        "password" VARCHAR NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "condition" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL UNIQUE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "treatment_status" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL UNIQUE,
        "orderPriority" INTEGER NOT NULL DEFAULT 1
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "treatment_type" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL UNIQUE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "medical_record" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "notes" TEXT, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "patient" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "lastName" VARCHAR NOT NULL,
        "phone" VARCHAR,
        "email" VARCHAR,
        "birthDate" DATE NOT NULL,
        "gender" "patient_gender_enum" NOT NULL,
        "address" TEXT,
        "medicalRecordId" uuid UNIQUE,
        "doctorId" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_patient_medicalRecord" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_record" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_patient_user" FOREIGN KEY ("doctorId") REFERENCES "user" ("id") ON DELETE CASCADE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "appointment" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "patient_id" uuid,
        "start" TIMESTAMP NOT NULL,
        "end" TIMESTAMP NOT NULL,
        "notes" VARCHAR,
        "doctorId" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_appointment_patient" FOREIGN KEY ("patient_id") REFERENCES "patient" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_appointment_user" FOREIGN KEY ("doctorId") REFERENCES "user" ("id") ON DELETE CASCADE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "medical_record_condition" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "medical_record_id" uuid NOT NULL,
        "condition_id" uuid NOT NULL,
        CONSTRAINT "FK_mrc_medical_record" FOREIGN KEY ("medical_record_id") REFERENCES "medical_record" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_mrc_condition" FOREIGN KEY ("condition_id") REFERENCES "condition" ("id") ON DELETE CASCADE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "treatment" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "medical_record_id" uuid NOT NULL,
        "treatment_type_id" uuid NOT NULL,
        "totalPrice" DECIMAL(10,2) NOT NULL,
        "status_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_treatment_medical_record" FOREIGN KEY ("medical_record_id") REFERENCES "medical_record" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_treatment_type" FOREIGN KEY ("treatment_type_id") REFERENCES "treatment_type" ("id"),
        CONSTRAINT "FK_treatment_status" FOREIGN KEY ("status_id") REFERENCES "treatment_status" ("id")
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "procedure" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "treatment_id" uuid NOT NULL,
        "date" DATE NOT NULL,
        "description" TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_procedure_treatment" FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("id") ON DELETE CASCADE
      );
    `);
        await queryRunner.query(`
      CREATE TABLE "payment" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "procedure_id" uuid UNIQUE,
        "date" DATE NOT NULL,
        "amount" DECIMAL(10,2) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_payment_procedure" FOREIGN KEY ("procedure_id") REFERENCES "procedure" ("id") ON DELETE CASCADE
      );
    `);
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "user" ("email");`);
        await queryRunner.query(`CREATE INDEX "IDX_user_name" ON "user" ("name");`);
        await queryRunner.query(`CREATE INDEX "IDX_patient_name" ON "patient" ("name");`);
        await queryRunner.query(`CREATE INDEX "IDX_patient_lastName" ON "patient" ("lastName");`);
        await queryRunner.query(`CREATE INDEX "IDX_patient_email" ON "patient" ("email");`);
        await queryRunner.query(`CREATE INDEX "IDX_patient_created_at" ON "patient" ("created_at");`);
        await queryRunner.query(`CREATE INDEX "IDX_treatment_status" ON "treatment" ("status_id");`);
        await queryRunner.query(`CREATE INDEX "IDX_treatment_created_at" ON "treatment" ("created_at");`);
        await queryRunner.query(`CREATE INDEX "IDX_procedure_date" ON "procedure" ("date");`);
        await queryRunner.query(`CREATE INDEX "IDX_procedure_created_at" ON "procedure" ("created_at");`);
        await queryRunner.query(`CREATE INDEX "IDX_payment_date" ON "payment" ("date");`);
        await queryRunner.query(`CREATE INDEX "IDX_appointment_start" ON "appointment" ("start");`);
        await queryRunner.query(`CREATE INDEX "IDX_appointment_doctor" ON "appointment" ("doctorId");`);
        await queryRunner.query(`CREATE INDEX "IDX_appointment_patient" ON "appointment" ("patient_id");`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_appointment_patient";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_appointment_doctor";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_appointment_start";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_payment_date";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_procedure_created_at";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_procedure_date";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_treatment_created_at";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_treatment_status";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_patient_created_at";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_patient_email";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_patient_lastName";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_patient_name";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_name";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_email";`);
        await queryRunner.query(`DROP TABLE "payment";`);
        await queryRunner.query(`DROP TABLE "procedure";`);
        await queryRunner.query(`DROP TABLE "treatment";`);
        await queryRunner.query(`DROP TABLE "medical_record_condition";`);
        await queryRunner.query(`DROP TABLE "appointment";`);
        await queryRunner.query(`DROP TABLE "patient";`);
        await queryRunner.query(`DROP TABLE "medical_record";`);
        await queryRunner.query(`DROP TABLE "treatment_type";`);
        await queryRunner.query(`DROP TABLE "treatment_status";`);
        await queryRunner.query(`DROP TABLE "condition";`);
        await queryRunner.query(`DROP TABLE "user";`);
        await queryRunner.query(`DROP TYPE "patient_gender_enum";`);
        await queryRunner.query(`DROP TYPE "user_role_enum";`);
    }
}
exports.InitialSchemaClinica20250812123045 = InitialSchemaClinica20250812123045;
//# sourceMappingURL=20250812123045-InitialSchemaClinica.js.map