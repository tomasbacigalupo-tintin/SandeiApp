import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { IaModule } from './ia.module';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as request from 'supertest';

describe('IaController', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IaModule],
    })
      .overrideProvider(HttpService)
      .useValue({ post: jest.fn() })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpService = moduleRef.get<HttpService>(HttpService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /ia/suggest_lineup', () => {
    const data = { lineup: 'ok' };
    (httpService.post as jest.Mock).mockReturnValue(
      of({ data } as AxiosResponse),
    );
    return request(app.getHttpServer())
      .post('/ia/suggest_lineup')
      .send({ players: ['x'], formation: '4-4-2' })
      .expect(HttpStatus.CREATED)
      .expect(data);
  });
});
