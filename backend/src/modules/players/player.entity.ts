<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Column({ default: true })
  isActive!: boolean;
}

=======
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  stats?: Record<string, any>;

  @Column({ type: 'float', nullable: true })
  fitness?: number;

  @Column({ type: 'float', nullable: true })
  technical?: number;
}

>>>>>>> a7433a5 (feat(players): módulo completo con entidad y configuración para migración)
