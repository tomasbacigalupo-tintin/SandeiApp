process.env.RABBITMQ_URL = 'amqp://localhost';
process.env.DATABASE_URL = 'dummy';
process.env.JWT_SECRET = 'secret';
process.env.IA_SERVICE_URL = 'http://localhost';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { MatchesService } from '../matches.service';
import { Match } from '../match.entity';
import { RabbitMQService } from '../../../messaging/rabbitmq.service';

describe('MatchesService', () => {
  let service: MatchesService;
  let repo: Repository<Match>;
  let rabbit: RabbitMQService;

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
        { provide: RabbitMQService, useValue: { publish: jest.fn() } },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
    repo = module.get(getRepositoryToken(Match));
    rabbit = module.get<RabbitMQService>(RabbitMQService);
  });

  it('creates a match', async () => {
    const data = { location: 'A' } as Partial<Match>;
    const created = { ...data, tenantId: 't1' } as Match;
    (repo.create as jest.Mock).mockReturnValue(created);
    (repo.save as jest.Mock).mockResolvedValue({ ...created, id: '1' });

    const result = await service.create(data, 't1');
    expect(repo.create).toHaveBeenCalledWith({ ...data, tenantId: 't1' });
    expect(repo.save).toHaveBeenCalledWith({ ...data, tenantId: 't1' });
    expect(rabbit.publish).toHaveBeenCalledWith('matches.created', { ...created, id: '1' });
    expect(result).toEqual({ ...created, id: '1' });
  });

  it('removes a match if found', async () => {
    const match = { id: '1' } as Match;
    (repo.findOneByOrFail as jest.Mock).mockResolvedValue(match);
    await service.remove('1', 't1');
    expect(repo.remove).toHaveBeenCalledWith(match);
  });

  it('throws EntityNotFoundError when removing missing match', async () => {
    (repo.findOneByOrFail as jest.Mock).mockRejectedValue(new EntityNotFoundError(Match, 'test'));
    await expect(service.remove('nope', 't1')).rejects.toBeInstanceOf(EntityNotFoundError);
  });
});
