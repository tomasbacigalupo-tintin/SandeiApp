import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { MatchesService } from '../matches.service';
import { Match } from '../match.entity';

describe('MatchesService', () => {
  let service: MatchesService;
  let repo: Repository<Match>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: getRepositoryToken(Match),
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

    service = module.get<MatchesService>(MatchesService);
    repo = module.get(getRepositoryToken(Match));
  });

  it('creates a match', async () => {
    const data = { location: 'A' } as Partial<Match>;
    (repo.create as jest.Mock).mockReturnValue(data);
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', ...data });

    const result = await service.create(data);
    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(data);
    expect(result).toEqual({ id: '1', ...data });
  });

  it('removes a match if found', async () => {
    const match = { id: '1' } as Match;
    (repo.findOneByOrFail as jest.Mock).mockResolvedValue(match);
    await service.remove('1');
    expect(repo.remove).toHaveBeenCalledWith(match);
  });

  it('throws EntityNotFoundError when removing missing match', async () => {
    (repo.findOneByOrFail as jest.Mock).mockRejectedValue(new EntityNotFoundError(Match, 'test'));
    await expect(service.remove('nope')).rejects.toBeInstanceOf(EntityNotFoundError);
  });
});
