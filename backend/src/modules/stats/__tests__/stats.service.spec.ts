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

  it('aggregates ratings per player concurrently', async () => {
    (playersService.findAll as jest.Mock).mockResolvedValue([
      { id: 'p1', name: 'John' },
      { id: 'p2', name: 'Jane' },
    ]);

    const resolvers: Array<() => void> = [];
    (ratingsService.averageForPlayer as jest.Mock).mockImplementation((id: string) => {
      return new Promise<number>(resolve => {
        resolvers.push(() => resolve(id === 'p1' ? 5 : 7));
      });
    });

    const statsPromise = service.getStats('month');

    // allow pending microtasks to run so service triggers rating calls
    await Promise.resolve();

    // both rating calculations should have been triggered before any resolve
    expect(ratingsService.averageForPlayer).toHaveBeenCalledTimes(2);

    resolvers.forEach(fn => fn());

    const result = await statsPromise;

    expect(result).toEqual([
      { name: 'John', value: 5 },
      { name: 'Jane', value: 7 },
    ]);
  });

  it('passes a date when range is month', async () => {
    (playersService.findAll as jest.Mock).mockResolvedValue([
      { id: 'p1', name: 'John' },
    ]);
    (ratingsService.averageForPlayer as jest.Mock).mockResolvedValue(5);

    await service.getStats('month');

    const callArgs = (ratingsService.averageForPlayer as jest.Mock).mock.calls[0];
    expect(callArgs[1]).toBeInstanceOf(Date);
  });

  it('passes undefined when range is season', async () => {
    (playersService.findAll as jest.Mock).mockResolvedValue([
      { id: 'p1', name: 'John' },
    ]);
    (ratingsService.averageForPlayer as jest.Mock).mockResolvedValue(5);

    await service.getStats('season');

    const callArgs = (ratingsService.averageForPlayer as jest.Mock).mock.calls[0];
    expect(callArgs[1]).toBeUndefined();
  });
});
