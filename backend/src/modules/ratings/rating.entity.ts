import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Player } from '../players/player.entity';
import { Match } from '../matches/match.entity';

@Entity('rating')
@Unique(['player', 'match'])
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int')
  score!: number;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Player, { eager: true })
  player!: Player;

  @ManyToOne(() => Match, { eager: true })
  match!: Match;
}

