import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IaService } from './ia.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('IaService', () => {
  let service: IaService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [IaService],
    }).compile();

    service = module.get<IaService>(IaService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should request lineup to ia-service', async () => {
    const data = { lineup: 'test' };
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of({ data } as AxiosResponse));

    const result = await service.suggestLineup(['a', 'b'], '4-4-2');
    expect(httpService.post).toHaveBeenCalledWith('/ia/suggest_lineup', {
      players: ['a', 'b'],
      formation: '4-4-2',
    });
    expect(result).toEqual(data);
  });
});
