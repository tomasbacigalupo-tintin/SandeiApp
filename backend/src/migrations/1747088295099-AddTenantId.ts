import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTenantId1747088295099 implements MigrationInterface {
  name = 'AddTenantId1747088295099'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" ADD "tenantId" varchar NOT NULL DEFAULT 'default'`);
    await queryRunner.query(`ALTER TABLE "match" ADD "tenantId" varchar NOT NULL DEFAULT 'default'`);
    await queryRunner.query(`ALTER TABLE "rating" ADD "tenantId" varchar NOT NULL DEFAULT 'default'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "tenantId"`);
    await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "tenantId"`);
    await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "tenantId"`);
  }
}

