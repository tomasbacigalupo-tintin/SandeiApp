import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';
import { Player } from '../player.entity';
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
            searchByName: jest.fn(),
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

  it('throws EntityNotFoundError when player not found', async () => {
    (service.findOne as jest.Mock).mockRejectedValue(new EntityNotFoundError(Player, 'test'));
    await expect(controller.findOne('x')).rejects.toBeInstanceOf(EntityNotFoundError);
  });

  it('calls service to create a player', () => {
    controller.create({ name: 'test' } as any);
    expect(service.create).toHaveBeenCalled();
  });

  it('searches players', () => {
    controller.search('john');
    expect(service.searchByName).toHaveBeenCalledWith('john');
  });
});
