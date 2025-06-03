import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from '../stats.controller';
import { StatsService } from '../stats.service';

describe('StatsController', () => {
  let controller: StatsController;
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: StatsService,
          useValue: { getStats: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
  });

  it('calls service to get monthly stats', async () => {
    (service.getStats as jest.Mock).mockResolvedValue([{ name: 'A', value: 1 }]);

    const result = await controller.getStats('month');

    expect(service.getStats).toHaveBeenCalledWith('month');
    expect(result).toEqual([{ name: 'A', value: 1 }]);
  });

  it('calls service to get season stats', async () => {
    (service.getStats as jest.Mock).mockResolvedValue([{ name: 'A', value: 1 }]);

    const result = await controller.getStats('season');

    expect(service.getStats).toHaveBeenCalledWith('season');
    expect(result).toEqual([{ name: 'A', value: 1 }]);
  });
});
