import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PlayerPosition {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  MIDFIELDER = 'midfielder',
  FORWARD = 'forward',
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: PlayerPosition, nullable: true })
  position!: PlayerPosition;

  @Column('int', { default: 0 })
  score!: number;
}

