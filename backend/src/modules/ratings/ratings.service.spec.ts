import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';
import { Match } from '../matches/match.entity';
import { Player } from '../players/player.entity';

describe('RatingsService', () => {
  let service: RatingsService;
  let ratingsRepo: Repository<Rating>;
  let matchesRepo: Repository<Match>;
  let playersRepo: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Match),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Player),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    ratingsRepo = module.get(getRepositoryToken(Rating));
    matchesRepo = module.get(getRepositoryToken(Match));
    playersRepo = module.get(getRepositoryToken(Player));
  });

  it('creates a rating', async () => {
    const match = { id: 'm1' } as Match;
    const player = { id: 'p1' } as Player;
    (matchesRepo.findOne as jest.Mock).mockResolvedValue(match);
    (playersRepo.findOne as jest.Mock).mockResolvedValue(player);
    (ratingsRepo.create as jest.Mock).mockReturnValue({ score: 8, match, player });
    (ratingsRepo.save as jest.Mock).mockResolvedValue({ id: 'r1' });

    const result = await service.create('m1', 'p1', 8, 'good');
    expect(ratingsRepo.create).toHaveBeenCalledWith({ score: 8, comment: 'good', match, player });
    expect(ratingsRepo.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 'r1' });
  });

  it('throws if score out of range', async () => {
    await expect(service.create('m1', 'p1', 11)).rejects.toThrow();
  });

  it('throws on duplicate rating', async () => {
    const match = { id: 'm1' } as Match;
    const player = { id: 'p1' } as Player;
    (matchesRepo.findOne as jest.Mock).mockResolvedValue(match);
    (playersRepo.findOne as jest.Mock).mockResolvedValue(player);
    (ratingsRepo.findOne as jest.Mock).mockResolvedValue({ id: 'r1' });
    await expect(service.create('m1', 'p1', 5)).rejects.toThrow();
  });
});
