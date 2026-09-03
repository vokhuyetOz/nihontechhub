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
import { DateHelper } from 'src/common/helper';

describe('API Endpoints (e2e)', () => {
  let app: INestApplication;

  const emailAdminLogin = 'admin@exmaple.com';
  let token;
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

  describe('Home', () => {
    it('GET /', async () => {
      const response = await request(app.getHttpServer()).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('Admin', () => {
    it('POST /api/v1/admin/login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      token = response.body.token;
      expect(response.status).toBe(200);
    });

    it('GET /api/v1/admin/manage-user/bulk', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/admin/manage-user/bulk')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('POST /api/v1/admin/manage-user/bulk', async () => {
      const email = `${DateHelper.currentDate().getTime()}@example.com`;
      const email1 = `${DateHelper.currentDate().getTime() + 1}@example.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user/bulk')
        .set('Authorization', `Bearer ${token}`)
        .send({
          users: [
            {
              email: email,
              password: 'password',
            },
            {
              email: email1,
              password: 'password',
            },
          ],
        });
      expect(response.status).toBe(201);
    });

    it('GET /api/v1/admin/manage-user/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@test.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdGet = response.body.id;
      const response1 = await request(app.getHttpServer())
        .get(`/api/v1/admin/manage-user/${userIdGet}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(200);
    });

    it('PATCH /api/v1/admin/manage-user/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@gmail.com`;
      const emailChange = `${DateHelper.currentDate().getTime()}@change.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdPatch = response.body.id;
      const response1 = await request(app.getHttpServer())
        .patch(`/api/v1/admin/manage-user/${userIdPatch}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: emailChange,
        });
      expect(response1.status).toBe(200);
    });

    it('DELETE /api/v1/admin/manage-user/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@softDelete.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdsoftDelete = response.body.id;
      const response1 = await request(app.getHttpServer())
        .delete(`/api/v1/admin/manage-user/${userIdsoftDelete}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(200);
    });

    it('POST /api/v1/admin/manage-user', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@adminPost.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
        });
      expect(response.status).toBe(201);
    });

    it('PATCH /api/v1/admin/manage-user/deactive/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@deactive.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdDeactive = response.body.id;
      const response1 = await request(app.getHttpServer())
        .patch(`/api/v1/admin/manage-user/deactive/${userIdDeactive}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(200);
    });

    it('PATCH /api/v1/admin/manage-user/active/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@active.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
        });
      const userIdActive = response.body.id;
      const response1 = await request(app.getHttpServer())
        .patch(`/api/v1/admin/manage-user/active/${userIdActive}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(200);
    });

    it('PATCH /api/v1/admin/manage-user/recover/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@recover.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdsoftDelete = response.body.id;
      await request(app.getHttpServer())
        .delete(`/api/v1/admin/manage-user/${userIdsoftDelete}`)
        .set('Authorization', `Bearer ${token}`);
      const userIdRecover = response.body.id;
      const response2 = await request(app.getHttpServer())
        .patch(`/api/v1/admin/manage-user/recover/${userIdRecover}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response2.status).toBe(200);
    });

    it('DELETE /api/v1/admin/manage-user/hard/:id', async () => {
      const loginAdmin = await request(app.getHttpServer())
        .post('/api/v1/admin/login')
        .send({
          email: emailAdminLogin,
          password: 'password',
          provider: 'email',
          device_id: 'string',
        });
      const token = loginAdmin.body.token;
      const email = `${DateHelper.currentDate().getTime()}@hardDelete.com`;
      const response = await request(app.getHttpServer())
        .post('/api/v1/admin/manage-user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: email,
          password: 'password',
          active: true,
        });
      const userIdDeleteHard = response.body.id;
      const response1 = await request(app.getHttpServer())
        .delete(`/api/v1/admin/manage-user/hard/${userIdDeleteHard}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(204);
    });
    describe('DELETE DATA TEST', () => {
      // it("", async()=>{
      // })
    });
  });
});
