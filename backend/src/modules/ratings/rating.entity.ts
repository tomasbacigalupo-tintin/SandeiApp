import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { TenantEntity } from '../common/tenant.entity';
import { Player } from '../players/player.entity';
import { Match } from '../matches/match.entity';

@Entity('rating')
@Unique(['player', 'match'])
export class Rating extends TenantEntity {

  @Column('int')
  score!: number;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Player, { eager: true })
  player!: Player;

  @ManyToOne(() => Match, { eager: true })
  match!: Match;
}

