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
    })
      .overrideGuard(require('../../auth/keycloak-auth.guard').KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
  });

  it('calls service to get monthly stats', async () => {
    (service.getStats as jest.Mock).mockResolvedValue([{ name: 'A', value: 1 }]);

    const result = await controller.getStats('month', { tenantId: 't1' } as any);

    expect(service.getStats).toHaveBeenCalledWith('month', 't1');
    expect(result).toEqual([{ name: 'A', value: 1 }]);
  });

  it('calls service to get season stats', async () => {
    (service.getStats as jest.Mock).mockResolvedValue([{ name: 'A', value: 1 }]);

    const result = await controller.getStats('season', { tenantId: 't1' } as any);

    expect(service.getStats).toHaveBeenCalledWith('season', 't1');
    expect(result).toEqual([{ name: 'A', value: 1 }]);
  });
});
