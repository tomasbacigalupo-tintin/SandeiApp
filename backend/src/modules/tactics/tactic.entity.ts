import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../common/tenant.entity';

@Entity('tactic')
export class Tactic extends TenantEntity {
  @Column()
  name!: string;

  @Column()
  formation!: string;

  @Column('jsonb')
  positions!: Record<string, string>; // playerId -> position
}
