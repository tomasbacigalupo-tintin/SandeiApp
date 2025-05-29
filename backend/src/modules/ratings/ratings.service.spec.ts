import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';
import { Match } from '../matches/match.entity';
import { Player } from '../players/player.entity';

describe('RatingsService', () => {
  let service: RatingsService;
  let manager: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    manager = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Match),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Player),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: DataSource,
          useValue: { transaction: jest.fn(fn => fn(manager)) },
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('creates a rating', async () => {
    const match = { id: 'm1' } as Match;
    const player = { id: 'p1' } as Player;
    manager.findOne.mockResolvedValueOnce(match);
    manager.findOne.mockResolvedValueOnce(player);
    manager.findOne.mockResolvedValueOnce(null);
    manager.create.mockReturnValue({ score: 8, match, player });
    manager.save.mockResolvedValue({ id: 'r1' });

    const result = await service.create('m1', 'p1', 8, 'good');
    expect(manager.create).toHaveBeenCalledWith(Rating, { score: 8, comment: 'good', match, player });
    expect(manager.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 'r1' });
  });

  it('throws if score out of range', async () => {
    await expect(service.create('m1', 'p1', 11)).rejects.toThrow();
  });

  it('throws on duplicate rating', async () => {
    const match = { id: 'm1' } as Match;
    const player = { id: 'p1' } as Player;
    manager.findOne.mockResolvedValueOnce(match);
    manager.findOne.mockResolvedValueOnce(player);
    manager.findOne.mockResolvedValueOnce({ id: 'r1' });
    await expect(service.create('m1', 'p1', 5)).rejects.toThrow();
  });
});
