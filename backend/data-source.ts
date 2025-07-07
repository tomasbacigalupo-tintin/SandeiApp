import { DataSource } from 'typeorm';
import { env } from './src/config/env';

export default new DataSource({
  type: 'postgres',
  url: env.databaseUrl,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: env.dbLogging,
});
