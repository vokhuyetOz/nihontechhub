# NestJS codebase (MikroOrm, mySQL, Swagger, Authentication, Authorization)

REST API with NestJS and MySQL, Using MikroOrm to connect.
This project has the base code for the functions

- Authentication - using jwt.

- Authorization - use casl to decentralize users.

- Transform Interceptor - format response.

This base project also contains basic instructions on using and programming additional functions.

## Authors

- [@hungnv](hungnv@rabiloo.com)
- [@giangpt](giangpt@rabiloo.com)

## Name Convention

- Database and Variable: camelCase
- Filename: aaa-bbb.type.ts

## Enviroment Variables

```
  .env
  production.env (create if not exist)
```

- env: config file for the develop environment.
- production.env: config file for the production environment.

## Authentication

Need `SECRET_KEY` and `EXPIRESIN` - please check `src/module/authentication/auth.module.ts`

All API need token to call. If you want a PUBLIC API, please add:

This is controller file:

```
@Public()
@Get()
findAll() {
  return [];
}
```

The `payload` interface will contain the information you want to put in the token.

## 🔐 Role-Based Authorization with @Role Decorator & CASL in NestJS

```
- AccessRole:

  + Usage: @AccessRole(EAuthorRole.ADMIN, EAuthorRole.USER)

  + Guard: AuthRoleGuard - using global

  => Using for guard API can access by role (Admin, User, Agency, ...)

- AccessAdminRole:

  + Usage: @AccessAdminRole(EAdminRole.SUPER_ADMIN, EAdminRole.ADMIN)

  + Guard: AdminRoleGuard - Use in any cluster or API you want to protect @UseGuards(AdminRoleGuard)

  => API protection for only certain admins with certain rights (SUPER_ADMIN)

- Using CASL.
  Can configure actions for each role for guard API:
  
  For example usage:
  
  - src/module/book/book.controller.ts

  - src/module/book/casl (configuration folder)

```

## Installation and Run

- Dev version

```bash
  docker-compose up -d
```

- Production version

```bash
 docker compose -f docker-compose.yml -f docker-compose.production.yml --env-file production.env up -d
```

- Init user details

MySQL: `./init-mysql.sql`

- Install

```bash
  npm install
```

- Please install Eslint and Prettier extension if you are using vscode

- Run

```bash
  npm run start:dev
```

## Acknowledgements

- [NestJs Mikro-orm](https://mikro-orm.io/docs/quick-start)
- [NestJs Authentication](https://docs.nestjs.com/security/authentication)
- [NestJs Authorization Casl](https://docs.nestjs.com/security/authorization)

## Swagger API docs

This example repo uses the NestJS swagger module for API documentation. NestJS Swagger - (www.swagger.io)

## Logger

check `src/logger.middleware.ts` to write more. Turn on logger `src/main.ts`

## Adminer (MySQL admin tool)

Server: mysql:MYSQL_PORT
