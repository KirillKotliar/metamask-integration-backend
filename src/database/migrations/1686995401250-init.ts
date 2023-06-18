import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1686995401250 implements MigrationInterface {
  name = 'init1686995401250'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "logins" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "nonce" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')))')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_5d8f307694e97d11c6f889343a" ON "logins" ("user_id", "nonce") ')
    await queryRunner.query('CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "address" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')))')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_b0ec0293d53a1385955f9834d5" ON "users" ("address") ')
    await queryRunner.query('DROP INDEX "IDX_5d8f307694e97d11c6f889343a"')
    await queryRunner.query('CREATE TABLE "temporary_logins" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "nonce" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "FK_9e8c972b998b0a954ca819dfb51" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)')
    await queryRunner.query('INSERT INTO "temporary_logins"("id", "user_id", "nonce", "created_at") SELECT "id", "user_id", "nonce", "created_at" FROM "logins"')
    await queryRunner.query('DROP TABLE "logins"')
    await queryRunner.query('ALTER TABLE "temporary_logins" RENAME TO "logins"')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_5d8f307694e97d11c6f889343a" ON "logins" ("user_id", "nonce") ')
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_5d8f307694e97d11c6f889343a"')
    await queryRunner.query('ALTER TABLE "logins" RENAME TO "temporary_logins"')
    await queryRunner.query('CREATE TABLE "logins" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "nonce" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')))')
    await queryRunner.query('INSERT INTO "logins"("id", "user_id", "nonce", "created_at") SELECT "id", "user_id", "nonce", "created_at" FROM "temporary_logins"')
    await queryRunner.query('DROP TABLE "temporary_logins"')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_5d8f307694e97d11c6f889343a" ON "logins" ("user_id", "nonce") ')
    await queryRunner.query('DROP INDEX "IDX_b0ec0293d53a1385955f9834d5"')
    await queryRunner.query('DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP INDEX "IDX_5d8f307694e97d11c6f889343a"')
    await queryRunner.query('DROP TABLE "logins"')
  }

}
