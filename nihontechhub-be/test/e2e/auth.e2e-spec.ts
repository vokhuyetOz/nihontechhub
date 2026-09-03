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

describe('API Endpoints (e2e)', () => {
  let app: INestApplication;

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

  describe('Auth', () => {
    it('POST /api/v1/auth/refresh', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const refreshToken = loginAdmin.body.refreshToken;
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .send({
          token: refreshToken,
          device_id: 'string',
        });
      expect(response.status).toBe(200);
    });

    it('POST /api/v1/auth/logout', async () => {
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
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .send({ device_id: 'string' });
      expect(response.status).toBe(200);
    });

    it('POST /api/v1/auth/password/forgot', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/password/forgot')
        .send({ email: emailAdminLogin });
      expect(response.status).toBe(200);
    });

    it('POST /api/v1/auth/password/reset', async () => {
      const newOtp = await request(app.getHttpServer())
        .post('/api/v1/auth/password/forgot')
        .send({ email: emailAdminLogin });
      const otp = newOtp.body.otp;
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/password/reset')
        .send({
          otp: otp,
          password: 'password',
          email: emailAdminLogin,
        });
      expect(response.status).toBe(200);
    });

    // it('POST /api/v1/auth/password/verify', async () => {
    //   const response = await request(app.getHttpServer())
    //     .post('/api/v1/auth/password/verify')
    //     .send({ otp: otp, email: email });
    //   expect(response.status).toBe(200);
    // });
  });
});
