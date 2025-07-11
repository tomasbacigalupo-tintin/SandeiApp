import {
  Controller,
  Get,
  INestApplication,
  Module,
  UseGuards,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { KeycloakAuthGuard } from '../keycloak-auth.guard';

@Controller('secure')
class SecureController {
  @Get()
  @UseGuards(KeycloakAuthGuard)
  hello() {
    return 'ok';
  }
}

@Module({
  controllers: [SecureController],
  providers: [KeycloakAuthGuard],
})
class TestModule {}

describe('KeycloakAuthGuard', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects requests without Authorization header', () => {
    return request(app.getHttpServer()).get('/secure').expect(401);
  });

  it('allows requests with Authorization header', () => {
    return request(app.getHttpServer())
      .get('/secure')
      .set('Authorization', 'Bearer token')
      .expect(200)
      .expect('ok');
  });
});
