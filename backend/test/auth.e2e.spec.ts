process.env.DATABASE_URL = 'dummy';
process.env.JWT_SECRET = 'testsecret';
process.env.IA_SERVICE_URL = 'http://localhost';
process.env.RABBITMQ_URL = 'amqp://localhost';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { AuthModule } from '../src/modules/auth/auth.module';
import { User } from '../src/modules/auth/user.entity';

let hasSqlite = true;
try {
  require('sqlite3');
} catch {
  hasSqlite = false;
}
const describeOrSkip = hasSqlite ? describe : describe.skip;

describeOrSkip('AuthModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers and logs in a user', async () => {
    const payload = { name: 'Test', email: 'user@example.com', password: 'pass' };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload)
      .expect(201)
      .expect((res) => expect(res.body.token).toBeDefined());

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: payload.email, password: payload.password })
      .expect(201)
      .expect((res) => expect(res.body.token).toBeDefined());
  });
});
