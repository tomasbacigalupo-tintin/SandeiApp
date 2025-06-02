import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from '../../players/players.service';
import { RatingsService } from '../../ratings/ratings.service';
import { StatsService } from '../stats.service';

describe('StatsService', () => {
  let service: StatsService;
  let playersService: PlayersService;
  let ratingsService: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        { provide: PlayersService, useValue: { findAll: jest.fn() } },
        { provide: RatingsService, useValue: { averageForPlayer: jest.fn() } },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
    playersService = module.get<PlayersService>(PlayersService);
    ratingsService = module.get<RatingsService>(RatingsService);
  });

  it('aggregates ratings per player', async () => {
    (playersService.findAll as jest.Mock).mockResolvedValue([
      { id: 'p1', name: 'John' },
      { id: 'p2', name: 'Jane' },
    ]);
    (ratingsService.averageForPlayer as jest.Mock)
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(7);

    const result = await service.getStats('month');

    expect(result).toEqual([
      { name: 'John', value: 5 },
      { name: 'Jane', value: 7 },
    ]);
  });
});
