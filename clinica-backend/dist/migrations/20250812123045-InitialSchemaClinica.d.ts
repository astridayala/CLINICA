import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitialSchemaClinica20250812123045 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
