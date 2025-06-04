import { DataSource } from 'typeorm';
import { env } from './config/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.databaseUrl,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: env.dbLogging,
});

