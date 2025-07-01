import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../common/tenant.entity';

@Entity('match')
export class Match extends TenantEntity {

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  date!: Date;
}

