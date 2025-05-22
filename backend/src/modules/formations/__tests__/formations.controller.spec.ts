import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FormationsController } from '../formations.controller';
import { FormationsService } from '../formations.service';

describe('FormationsController', () => {
  let controller: FormationsController;
  let service: FormationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationsController],
      providers: [
        {
          provide: FormationsService,
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

    controller = module.get<FormationsController>(FormationsController);
    service = module.get<FormationsService>(FormationsService);
  });

  it('throws NotFoundException when formation not found', async () => {
    (service.update as jest.Mock).mockResolvedValue(null);
    await expect(controller.update('x', {})).rejects.toBeInstanceOf(NotFoundException);
  });

  it('calls service to create a formation', () => {
    controller.create({ name: 'test' } as any);
    expect(service.create).toHaveBeenCalled();
  });
});
