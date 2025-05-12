<<<<<<< HEAD
import 'reflect-metadata';
import { DataSource } from 'typeorm';
require('dotenv').config();


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
=======
import { DataSource } from 'typeorm';
import { Player } from './modules/players/player.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'sandei',
  entities: [Player],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
>>>>>>> a7433a5 (feat(players): módulo completo con entidad y configuración para migración)
