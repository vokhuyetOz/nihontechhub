import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { CrudRequestInterceptor } from '@dataui/crud';
import { useContainer } from 'class-validator';
import { User } from 'src/module/user/entities/user.entity';

describe('API Endpoints (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const emailLogin = 'admin@exmaple.com';
  let user1: User;
  let otp;
  let user2: User;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix('api', {
      exclude: ['/'],
    });

    app.enableCors();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new CrudRequestInterceptor());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Login', () => {
    it('POST /api/v1/login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/login')
        .send({
          email: emailLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
          os: 'android',
          device_token: 'string',
        });
      token = response.body.token;
      expect(response.status).toBe(200);
    });
  });

  describe('Register', () => {
    it('POST /api/v1/register/email', async () => {
      const email = `${DateHelper.currentDate().getTime()}@register1.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/register/email')
        .send({ email: email, password: 'password' });
      user1 = response.body;
      user1 = response.body;
      expect(response.status).toBe(201);
    });

    it('POST /api/v1/register/verify/resend', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/register/verify/resend')
        .send({ email: user1.email });
      otp = response.body.otp;
      expect(response.status).toBe(200);
    });

    it('POST /api/v1/register/active/verify', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/register/active/verify')
        .send({ otp, email: user1.email });
      expect(response.status).toBe(200);
    });

    it('POST /api/v2/register/email', async () => {
      const email = `${DateHelper.currentDate().getTime()}@register4.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v2/register/email')
        .send({ email: email, password: 'password' });
      user2 = response.body;
      expect(response.status).toBe(201);
    });

    it('POST /api/v2/register/verify/resend', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v2/register/verify/resend')
        .send({ email: user2.email });
      otp = response.body.otp;
      expect(response.status).toBe(200);
    });
    it('POST /api/v1/register/active/verify', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/register/active/verify')
        .send({ otp, email: user2.email });
      expect(response.status).toBe(200);
    });
    describe('DELETE DATA TEST', () => {
      it('DELETE user1', async () => {
        const res = await request(app.getHttpServer())
          .delete(`/api/v1/admin/manage-user/hard/${user1.id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
      });
      it('DELETE user2', async () => {
        const res = await request(app.getHttpServer())
          .delete(`/api/v1/admin/manage-user/hard/${user2.id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
      });
    });
  });
});
