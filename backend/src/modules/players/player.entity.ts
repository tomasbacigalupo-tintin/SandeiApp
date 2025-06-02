import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  position!: string;

  @Column('int', { default: 0 })
  score!: number;

  @Column('jsonb', { nullable: true })
  stats?: Record<string, unknown>;

  @Column('int', { default: 0 })
  fitness!: number;

  @Column('int', { default: 0 })
  technical!: number;
}

