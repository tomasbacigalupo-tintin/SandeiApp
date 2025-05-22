import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatchesTable1747088295097 implements MigrationInterface {
    name = 'CreateMatchesTable1747088295097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_match_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "match"`);
    }
}
