import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PlayersController } from '../players.controller';
import { PlayersService } from '../players.service';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  it('throws NotFoundException when player not found', async () => {
    (service.findOne as jest.Mock).mockResolvedValue(null);
    await expect(controller.findOne('x')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('calls service to create a player', () => {
    controller.create({ name: 'test' } as any);
    expect(service.create).toHaveBeenCalled();
  });
});
