import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RatingsController } from '../ratings.controller';
import { RatingsService } from '../ratings.service';

describe('RatingsController', () => {
  let controller: RatingsController;
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        {
          provide: RatingsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(require('../../auth/keycloak-auth.guard').KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<RatingsController>(RatingsController);
    service = module.get<RatingsService>(RatingsService);
  });

  it('calls service to create a rating', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'r1' });
    const dto = { playerId: 'p1', score: 5, comment: 'ok' } as any;
    const result = await controller.create('m1', dto);
    expect(service.create).toHaveBeenCalledWith('m1', 'p1', 5, 'ok');
    expect(result).toEqual({ id: 'r1' });
  });

  it('throws NotFoundException when service fails', async () => {
    const error = new NotFoundException('not found');
    (service.create as jest.Mock).mockRejectedValue(error);
    await expect(controller.create('m1', { playerId: 'p1', score: 5 } as any)).rejects.toBe(error);
  });
});
