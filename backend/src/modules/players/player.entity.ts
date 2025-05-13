import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  position!: string;

  @Column('int', { default: 0 })
  score!: number;
}

