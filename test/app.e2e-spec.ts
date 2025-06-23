import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  it('/authors (POST & GET)', async () => {
    const author = { firstName: 'E2E', lastName: 'Test' };
    const res = await request(app.getHttpServer())
      .post('/authors')
      .send(author)
      .expect(201);
    expect(res.body).toMatchObject(author);

    const list = await request(app.getHttpServer()).get('/authors').expect(200);
    expect(list.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => await app.close());
});
