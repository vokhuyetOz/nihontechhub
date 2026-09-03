import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endPoint: config.get('cfg.minio.endPoint'),
        port: config.get('cfg.minio.port'),
        useSSL: config.get('cfg.minio.useSSL'),
        accessKey: config.get('cfg.minio.accessKey'),
        secretKey: config.get('cfg.minio.SECRET_KEY'),
        partSize: config.get('cfg.minio.partSize') * 1024 * 1024,
      }),
    }),
    // ClientsModule.registerAsync({
    //   clients: [
    //     {
    //       name: 'UPLOAD_SERVICE',
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       useFactory: (config: ConfigService) => ({
    //         transport: Transport.RMQ,
    //         options: {
    //           urls: [`amqp://${config.get('cfg.rabbitmq.url')}`],
    //           queue: 'upload_queue',
    //           queueOptions: {
    //             durable: false,
    //           },
    //         },
    //       }),
    //     },
    //   ],
    // }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
