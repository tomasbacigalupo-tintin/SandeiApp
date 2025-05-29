import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IaService } from './ia.service';
import { of, throwError } from 'rxjs';
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

  it('should request tactics to ia-service', async () => {
    const data = { tactics: 'ok' };
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of({ data } as AxiosResponse));

    const result = await service.suggestTactics(['a'], undefined);
    expect(httpService.post).toHaveBeenCalledWith('/ia/suggest_tactics', {
      players: ['a'],
      style: undefined,
    });
    expect(result).toEqual(data);
  });

  it('should request match prediction to ia-service', async () => {
    const data = { prediction: '2-1' };
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of({ data } as AxiosResponse));

    const result = await service.predictMatch(['h'], ['a']);
    expect(httpService.post).toHaveBeenCalledWith('/ia/predict_match', {
      home_team: ['h'],
      away_team: ['a'],
    });
    expect(result).toEqual(data);
  });

  it('logs and rethrows errors from http service', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(throwError(() => new Error('fail')));
    const logSpy = jest.spyOn<any, any>(service['logger'], 'error');
    await expect(service.suggestLineup(['x'], '4-4-2')).rejects.toThrow('fail');
    expect(logSpy).toHaveBeenCalled();
  });

  it('logs and rethrows errors when suggesting tactics', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(throwError(() => new Error('fail')));
    const logSpy = jest.spyOn<any, any>(service['logger'], 'error');
    await expect(service.suggestTactics(['p'])).rejects.toThrow('fail');
    expect(logSpy).toHaveBeenCalled();
  });
});
