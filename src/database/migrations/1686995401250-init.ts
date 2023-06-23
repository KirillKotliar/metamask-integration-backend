import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1686995401250 implements MigrationInterface {
  name = 'init1686995401250'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "logins" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "nonce" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')))')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_5d8f307694e97d11c6f889343a" ON "logins" ("user_id", "nonce") ')
    await queryRunner.query('CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "address" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')))')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_b0ec0293d53a1385955f9834d5" ON "users" ("address") ')
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TABLE "logins"')
  }

}
