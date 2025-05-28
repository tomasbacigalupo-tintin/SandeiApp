import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: env.databaseUrl,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
};
