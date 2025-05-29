import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingsTable1747088295098 implements MigrationInterface {
    name = 'CreateRatingsTable1747088295098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "comment" character varying, "playerId" uuid, "matchId" uuid, CONSTRAINT "PK_rating_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_rating_player_match" UNIQUE ("playerId", "matchId"))`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_rating_player" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_rating_match" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_rating_match"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_rating_player"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }
}
