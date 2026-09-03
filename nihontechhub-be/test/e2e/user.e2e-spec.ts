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
  let user: User;
  let otp;
  let token;
  let emailChange;
  let tokenUser;
  const emailAdminLogin = 'admin@exmaple.com';

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
  describe('Create one user', () => {
    it('POST /api/v2/register/email', async () => {
      const email = `${DateHelper.currentDate().getTime()}@before.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v2/register/email')
        .send({ email: email, password: 'password' });
      user = response.body;
      expect(response.status).toBe(201);
    });

    it('POST /api/v2/register/verify/resend', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v2/register/verify/resend')
        .send({ email: user.email });
      otp = response.body.otp;
      expect(response.status).toBe(200);
    });
    it('POST /api/v1/register/active/verify', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/register/active/verify')
        .send({ otp, email: user.email });
      expect(response.status).toBe(200);
    });
  });
  describe('User', () => {
    it('GET /api/v1/user/bulk', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      token = loginAdmin.body.token;
      const response = await request(app.getHttpServer())
        .get('/api/v1/user/bulk')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('GET /api/v1/user/me', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const response = await request(app.getHttpServer())
        .get('/api/v1/user/me')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('PATCH /api/v1/user/me', async () => {
      emailChange = `${DateHelper.currentDate().getTime()}@after.com`;

      const login = await request(app.getHttpServer())
        .post('/api/v1/login')
        .send({
          email: user.email,
          password: 'password',
          provider: 'email',
          device_id: 'string',
          os: 'android',
          device_token: 'string',
        });
      tokenUser = login.body.token;
      const response1 = await request(app.getHttpServer())
        .patch('/api/v1/user/me')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({ email: emailChange });
      expect(response1.status).toBe(200);
    });

    it('PATCH /api/v1/user/password', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/v1/login')
        .send({
          email: emailChange,
          password: 'password',
          provider: 'email',
          device_id: 'string',
          os: 'android',
          device_token: 'string',
        });
      const token1 = login.body.token;
      const response = await request(app.getHttpServer())
        .patch('/api/v1/user/password')
        .set('Authorization', `Bearer ${token1}`)
        .send({ oldPassword: 'password', password: 'new_password' });
      user = response.body;
      expect(response.status).toBe(200);
    });

    // it('PATCH /api/v1/user/deactive', async () => {
    //   const login = await request(app.getHttpServer())
    //     .post('/api/v1/login')
    //     .send({
    //       email: user.email,
    //       password: 'new_password',
    //       provider: 'email',
    //       device_id: 'string',
    //       os: 'android',
    //       device_token: 'string',
    //     });
    //   const token1 = login.body.token;
    //   const response = await request(app.getHttpServer())
    //     .patch('/api/v1/user/deactive')
    //     .set('Authorization', `Bearer ${token1}`);

    //   expect(response.status).toBe(200);
    // });
  });
  describe('DELETE DATA TEST', () => {
    it('DELETE user1', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/admin/manage-user/hard/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);
    });
  });
});
