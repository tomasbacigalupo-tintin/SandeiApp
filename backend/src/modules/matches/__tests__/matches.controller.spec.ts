/* eslint-disable @typescript-eslint/no-var-requires */
process.env.RABBITMQ_URL = 'amqp://localhost';
process.env.DATABASE_URL = 'dummy';
process.env.JWT_SECRET = 'secret';
process.env.IA_SERVICE_URL = 'http://localhost';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';
import { Match } from '../match.entity';
import { MatchesController } from '../matches.controller';
import { MatchesService } from '../matches.service';

describe('MatchesController', () => {
  let controller: MatchesController;
  let service: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [
        {
          provide: MatchesService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(require('../../auth/keycloak-auth.guard').KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MatchesController>(MatchesController);
    service = module.get<MatchesService>(MatchesService);
  });

  it('throws EntityNotFoundError when match not found', async () => {
    (service.findById as jest.Mock).mockRejectedValue(new EntityNotFoundError(Match, 'test'));
    await expect(controller.findOne('x', { tenantId: 't1' } as any)).rejects.toBeInstanceOf(EntityNotFoundError);
  });

  it('calls service to create a match', () => {
    controller.create({} as any, { tenantId: 't1' } as any);
    expect(service.create).toHaveBeenCalled();
  });
});
