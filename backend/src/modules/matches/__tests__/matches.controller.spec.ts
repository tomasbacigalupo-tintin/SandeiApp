process.env.RABBITMQ_URL = 'amqp://localhost';
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
    }).compile();

    controller = module.get<MatchesController>(MatchesController);
    service = module.get<MatchesService>(MatchesService);
  });

  it('throws EntityNotFoundError when match not found', async () => {
    (service.findById as jest.Mock).mockRejectedValue(new EntityNotFoundError(Match, 'test'));
    await expect(controller.findOne('x')).rejects.toBeInstanceOf(EntityNotFoundError);
  });

  it('calls service to create a match', () => {
    controller.create({} as any);
    expect(service.create).toHaveBeenCalled();
  });
});
