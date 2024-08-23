import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/transactions (POST) should create a transaction', async () => {
    const transactionData = {
      dateTime: new Date().toISOString(),
      author: 'Test Author',
      sum: 100,
      category: 'Test Category',
      comment: 'Test Comment',
    };

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(transactionData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...transactionData,
    });
  });

  it('/transactions (GET) should return paginated transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions?page=1&limit=10')
      .expect(200);
  
    expect(response.body.transactions).toBeInstanceOf(Array);
    expect(response.body.transactions.length).toBeLessThanOrEqual(10);
    expect(response.body.total).toBeGreaterThanOrEqual(0);
  });
  

});
