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

