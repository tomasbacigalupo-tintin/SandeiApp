import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormationsService } from '../formations.service';
import { Formation } from '../formation.entity';

describe('FormationsService', () => {
  let service: FormationsService;
  let repo: Repository<Formation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormationsService,
        {
          provide: getRepositoryToken(Formation),
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

    service = module.get<FormationsService>(FormationsService);
    repo = module.get(getRepositoryToken(Formation));
  });

  it('creates a formation', async () => {
    const data = { name: '4-4-2' } as Partial<Formation>;
    (repo.create as jest.Mock).mockReturnValue(data);
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', ...data });

    const result = await service.create(data);
    expect(repo.create).toHaveBeenCalledWith(data);
    expect(repo.save).toHaveBeenCalledWith(data);
    expect(result).toEqual({ id: '1', ...data });
  });

  it('removes a formation if found', async () => {
    const formation = { id: '1' } as Formation;
    (repo.findOne as jest.Mock).mockResolvedValue(formation);
    await service.remove('1');
    expect(repo.remove).toHaveBeenCalledWith(formation);
  });

  it('returns null when removing missing formation', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    const result = await service.remove('x');
    expect(result).toBeNull();
  });
});
