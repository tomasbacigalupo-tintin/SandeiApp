import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController validation', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { register: jest.fn(), login: jest.fn() },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 400 when login body is invalid', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('x-tenant-id', '00000000-0000-0000-0000-000000000000')
      .send({ email: 'invalid' })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('returns 400 when register body is missing fields', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .set('x-tenant-id', '00000000-0000-0000-0000-000000000000')
      .send({ email: 'user@test.com' })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
