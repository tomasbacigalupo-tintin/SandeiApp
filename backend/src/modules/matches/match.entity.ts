import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('match')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  rival!: string;
}
