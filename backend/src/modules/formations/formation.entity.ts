import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('formation')
export class Formation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;
}
