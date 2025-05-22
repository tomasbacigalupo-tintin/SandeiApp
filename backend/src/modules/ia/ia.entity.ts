import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ia_task')
export class IaTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;
}
