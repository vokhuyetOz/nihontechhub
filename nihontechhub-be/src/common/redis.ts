// import { Logger } from '@nestjs/common';
// import { SchemaFieldTypes, createClient } from 'redis';
// import { Repository } from 'typeorm';

// import { RedisPrefix } from './enum';
// import {
//   convertData,
//   getTimeOfDate,
//   redisReplaceSpecialCharacters,
// } from './utils';

// const redisClient = createClient({
//   socket: {
//     host: 'redis',
//     port: 6379,
//   },
// });

// redisClient.on('error', (err) => Logger.log('Redis Client Error', err));

// redisClient.connect();

// export const hashSetRedisObject = async ({ key, data }) => {
//   const handler = {
//     created_at: getTimeOfDate,
//     updated_at: getTimeOfDate,
//     deleted_at: getTimeOfDate,
//     expired_at: getTimeOfDate,
//     password_changed_at: getTimeOfDate,
//     active: Number,
//     is_used: Number,
//     id: String,
//   };

//   const convertedData = convertData(data, handler);

//   await redisClient.hSet(key, convertedData);
// };

// export const updateRedisObject = async ({
//   prefix,
//   index,
//   field,
//   value,
//   data,
// }) => {
//   value = redisReplaceSpecialCharacters(value);
//   const query = `@${field}:{${value}}`;

//   const response = await redisClient.ft.search(index, query, {
//     LIMIT: { from: 0, size: 1 },
//   });

//   if (!response.total) {
//     return;
//   }

//   const key = `${prefix}${data.id}`;

//   await hashSetRedisObject({ key, data });
// };

// export const delRedisObject = async ({ prefix, id }) => {
//   const key = `${prefix}${id}`;

//   await redisClient.del(key);
// };

// export const createRedisObjectWithKey = async (
//   prefix: RedisPrefix,
//   repo: Repository<any>,
// ) => {
//   const count = await repo.count();
//   const take = 10;

//   for (let i = take; i < count + take; i += take) {
//     const result = await repo.find({
//       withDeleted: true,
//       take: take,
//       skip: i - take,
//     });

//     for (const data of result) {
//       const key = `${prefix}${data.id}`;
//       await hashSetRedisObject({ key, data });
//     }
//   }
// };

// export const createRedisHashIndexes = async ({ index, prefix, schema }) => {
//   try {
//     await redisClient.ft.create(index, schema, {
//       ON: 'HASH',
//       PREFIX: prefix,
//     });
//   } catch (e) {
//     if (e.message === 'Index already exists') {
//       Logger.log('Index exists already, skipped creation.');
//     } else {
//       // Something went wrong, perhaps RediSearch isn't installed...
//       process.exit(1);
//     }
//   }
// };

// export const extractKeysFromSchema = (schema) => {
//   const result = Object.keys(schema);
//   result.forEach((item) => '@' + item);

//   return result;
// };

// export const userRedisSchema = {
//   id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   username: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   email: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   password: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   role: {
//     type: SchemaFieldTypes.TEXT,
//     SORTABLE: true,
//   },
//   active: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   created_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   updated_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   deleted_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   password_changed_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
// };

// export const refreshTokenRedisSchema = {
//   id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   user_id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   email: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   token: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   is_used: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   created_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   updated_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   deleted_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   expired_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
// };

// export const resetPasswordTokenRedisSchema = {
//   id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   email: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   token: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   is_used: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   created_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   updated_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   deleted_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   expired_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
// };

// export const activeAccountTokenRedisSchema = {
//   id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   email: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   token: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   is_used: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   created_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   updated_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   deleted_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   expired_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
// };

// export const bookRedisSchema = {
//   id: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   title: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   author: {
//     type: SchemaFieldTypes.TAG,
//     SEPARATOR: ';',
//     SORTABLE: true,
//   },
//   created_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   updated_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
//   deleted_at: {
//     type: SchemaFieldTypes.NUMERIC,
//     SORTABLE: true,
//   },
// };

// export { redisClient };

// // export class RedisModuleCli {
// //   static instance: any;
// //   static initialize(options: RedisClientOptions) {
// //     if (!this.instance) {
// //       this.instance = createClient(options);
// //     }
// //     return this.initialize;
// //   }
// // }
