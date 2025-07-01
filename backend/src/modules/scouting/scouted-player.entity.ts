import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../common/tenant.entity';

@Entity('scouted_player')
export class ScoutedPlayer extends TenantEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  position?: string;

  @Column('int', { default: 0 })
  rating!: number;

  @Column({ nullable: true })
  notes?: string;
}
