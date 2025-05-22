import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayersService } from '../players.service';
import { Player } from '../player.entity';

describe('PlayersService', () => {
  let service: PlayersService;
  let repo: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
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
    const data = { name: 'John' } as Partial<Player>;
    (repo.create as jest.Mock).mockReturnValue(data);
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', ...data });

    const result = await service.create(data);
    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(data);
    expect(result).toEqual({ id: '1', ...data });
  });

  it('removes a player if found', async () => {
    const player = { id: '1' } as Player;
    (repo.findOne as jest.Mock).mockResolvedValue(player);
    await service.remove('1');
    expect(repo.remove).toHaveBeenCalledWith(player);
  });

  it('returns null when removing missing player', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    const result = await service.remove('nope');
    expect(result).toBeNull();
  });
});
