import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { PlayersService } from '../players.service';
import { Player } from '../player.entity';
import { RatingsService } from '../../ratings/ratings.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let repo: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        { provide: RatingsService, useValue: { averageForPlayer: jest.fn() } },
        {
          provide: getRepositoryToken(Player),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneByOrFail: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
    },
  ],
  }).compile();

    service = module.get<PlayersService>(PlayersService);
    repo = module.get(getRepositoryToken(Player));
  });

  it('creates a player', async () => {
    const data = {
      name: 'John',
      stats: {},
      fitness: 50,
      technical: 60,
    } as Partial<Player>;
    const created = { ...data, tenantId: 't1' } as Player;
    (repo.create as jest.Mock).mockReturnValue(created);
    (repo.save as jest.Mock).mockResolvedValue({ ...created, id: '1' });

    const result = await service.create(data, 't1');
    expect(repo.create).toHaveBeenCalledWith({ ...data, tenantId: 't1' });
    expect(repo.save).toHaveBeenCalledWith({ ...data, tenantId: 't1' });
    expect(result).toEqual({ ...created, id: '1' });
  });

  it('removes a player if found', async () => {
    const player = { id: '1' } as Player;
    (repo.findOneByOrFail as jest.Mock).mockResolvedValue(player);
    await service.remove('1', 't1');
    expect(repo.remove).toHaveBeenCalledWith(player);
  });

  it('searches players by name', async () => {
    const players = [{ id: '1', name: 'John' }] as Player[];
    (repo.find as jest.Mock).mockResolvedValue(players);
    const result = await service.searchByName('jo', 't1');
    expect(repo.find).toHaveBeenCalledWith({ where: { name: expect.anything(), tenantId: 't1' } });
    expect(result).toEqual(players);
  });

  it('searches players by position', async () => {
    const players = [{ id: '1', position: 'Forward' }] as Player[];
    (repo.find as jest.Mock).mockResolvedValue(players);
    const result = await service.searchByPosition('for', 't1');
    expect(repo.find).toHaveBeenCalledWith({ where: { position: expect.anything(), tenantId: 't1' } });
    expect(result).toEqual(players);
  });

  it('throws EntityNotFoundError when removing missing player', async () => {
    (repo.findOneByOrFail as jest.Mock).mockRejectedValue(new EntityNotFoundError(Player, 'test'));
    await expect(service.remove('nope', 't1')).rejects.toBeInstanceOf(EntityNotFoundError);
  });
});
