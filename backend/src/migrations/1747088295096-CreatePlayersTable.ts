import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayersTable1747088295096 implements MigrationInterface {
    name = 'CreatePlayersTable1747088295096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "position" character varying,
            "score" integer NOT NULL DEFAULT 0,
            "stats" jsonb,
            "fitness" integer NOT NULL DEFAULT 0,
            "technical" integer NOT NULL DEFAULT 0,
            CONSTRAINT "PK_players_id" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
