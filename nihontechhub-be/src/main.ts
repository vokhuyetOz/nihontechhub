import {
  CustomCrudRequestInterceptor,
  TransformInterceptor,
} from '@common/interceptor';
import { CrudRequestInterceptor } from '@dataui/crud';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
// import { UserService } from './module/user/user.service';
// import { redisClient } from './common/redis';
// import { BookService } from './module/book/book.service';
// import { Transport } from '@nestjs/microservices';
process.env.TZ = 'UTC';
async function bootstrap() {
  // Turn on logging to file
  // --------------------

  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };

  // const date = DateHelper.currentDate();
  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  // const [year, month, day] = [
  //   date.getFullYear(),
  //   months[date.getMonth()],
  //   date.getDate(),
  // ];

  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  // logger: WinstonModule.createLogger({
  //   transports: [
  //     new transports.File({
  //       filename: `logs/${year}/${month}/${day}/${day}-${month}-${year}.log`,
  //     }),
  //   ],
  // }),
  // httpsOptions: process.env.ENABLE_HTTPS === 'true' ? httpsOptions : {},
  // });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
  //     ],
  //     // urls: [`amqp://rabbitmq:5672`],
  //     queue: 'upload_video',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  await app.startAllMicroservices();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.use(
    ['/swagger'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.enableCors();

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new CrudRequestInterceptor(),
    new CustomCrudRequestInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );

  app.setViewEngine('ejs');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const options = new DocumentBuilder()
    .setTitle('NestJS w/ mikroORM, MySQL and MongoDB')
    .setDescription('Helpful')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: ['get', 'post', 'patch', 'delete'],
      tryItOutEnabled: true,
    },
  });

  // await redisClient.flushAll();

  // const userService = app.get<UserService>(UserService);
  // await userService.addTablesIntoRedis();

  // const bookService = app.get<BookService>(BookService);
  // await bookService.initRedisTable();
  app.set('query parser', 'extended');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
