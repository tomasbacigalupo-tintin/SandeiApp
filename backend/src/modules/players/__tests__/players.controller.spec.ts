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
            searchByPosition: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getAverageRating: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(require('../../auth/keycloak-auth.guard').KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  it('throws EntityNotFoundError when player not found', async () => {
    (service.findOne as jest.Mock).mockRejectedValue(new EntityNotFoundError(Player, 'test'));
    await expect(controller.findOne('x', { tenantId: 't1' } as any)).rejects.toBeInstanceOf(EntityNotFoundError);
  });

  it('calls service to create a player', () => {
    controller.create({ name: 'test', stats: {}, fitness: 10, technical: 20 } as any, { tenantId: 't1' } as any);
    expect(service.create).toHaveBeenCalled();
  });

  it('searches players', () => {
    controller.search('john', { tenantId: 't1' } as any);
    expect(service.searchByName).toHaveBeenCalledWith('john', 't1');
  });

  it('searches players by position', () => {
    controller.searchByPosition('forward', { tenantId: 't1' } as any);
    expect(service.searchByPosition).toHaveBeenCalledWith('forward', 't1');
  });

  it('gets average rating', () => {
    controller.getAverageRating('id', { tenantId: 't1' } as any);
    expect(service.getAverageRating).toHaveBeenCalledWith('id', 't1');
  });
});
