import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
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

  it('throws NotFoundException when match not found', async () => {
    (service.findById as jest.Mock).mockResolvedValue(null);
    await expect(controller.findOne('x')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('calls service to create a match', () => {
    controller.create({} as any);
    expect(service.create).toHaveBeenCalled();
  });
});
