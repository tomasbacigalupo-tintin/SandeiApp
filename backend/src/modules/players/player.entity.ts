import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../common/tenant.entity';

@Entity('players')
export class Player extends TenantEntity {

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

