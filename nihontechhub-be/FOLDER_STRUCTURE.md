🚀 NestJS REST API Project Structure

This document outlines the recommended project structure for a NestJS REST API application, providing a clear organization for scalable and maintainable code.

## 📁 Project Structure Overview

```
📦 project
├── 📁 src
│   ├── 🧰 common
│   ├── 🧩 module
│   ├── 📄 main.ts
│   ├── 📄 app.module.ts
│   ├── 📄 app.controller.ts
│   └── 📄 app.service.ts
├── 📑 template
├── 🧪 test
├── 📄 view
├── 📜 scripts
├── 🐳 Dockerfile
├── 📝 .env
└── 📋 package.json
```

## 📁 Detailed Structure

### 🧰 Common Directory

Contains shared code, utilities, and base classes used throughout the application.

```
📁 common
├── ✅ casl                            # Application Isomorphic Authorization with casl
│   ├── 🔣 constants                   # CASL-specific constants
│   │   ├── 📄 casl.type.ts            # CASL type definitions
│   │   └── 📄 casl.enum.ts            # CASL-related enums
│   ├── 📄 casl-ability.decorator.ts   # CASL policy decorators
│   ├── 📄 casl-ability.factory.ts     # CASL ability factory
│
├── ⚙️ config                          # Application configuration
│   └── 📄 configuration.ts            # Configuration files
│
├── 🎮 controller                      # Base controller logic
│   └── 📄 {name}.controller.ts        # Base controller files
│
├── 🎭 decorator                       # Application decorators
│   ├── 📄 index.ts                    # Exports all decorators
│   └── 📄 {name}.decorator.ts         # Decorator files
│
├── 📊 dto                             # Base Data Transfer Objects
│   ├── 📄 index.ts                    # Exports all DTOs
│   └── 📄 {name}.dto.ts               # DTO files
│
├── 📦 entities                        # Base entity definitions
│   └── 📄 {name}.entity.ts            # Entity files
│
├── 🔣 enums                           # Application enumerations
│   ├── 📄 index.ts                    # Exports all enums
│   └── 📄 {name}.enum.ts              # Enum files
│
├── ⚠️ errors                          # Custom error definitions
│   ├── 📄 index.ts                    # Exports all errors
│   └── 📄 {name}.error.ts             # Error files
│
├── 🛠️ helper                          # Helper utilities
│   ├── 📄 index.ts                    # Exports all helpers
│   └── 📄 {name}.helper.ts            # Helper files
│
├── 🔄 interceptor                     # Request/response interceptors
│   ├── 📄 index.ts                    # Exports all interceptors
│   └── 📄 {name}.interceptor.ts       # Interceptor files
│
├── 📋 metadata                        # Application metadata
│   └── 📄 {name}.metadata.ts          # Metadata files
│
├── 🔌 middleware                      # HTTP middleware
│   ├── 📄 index.ts                    # Exports all middleware
│   └── 📄 {name}.middleware.ts        # Middleware files
│
├── 🧪 pipes                           # Transformation/validation pipes
│   ├── 📄 index.ts                    # Exports all pipes
│   └── 📄 {name}.pipes.ts             # Pipe files
│
├── 🔧 services                        # Base services
│   └── 📄 {name}.service.ts           # Service files
│
├── 📝 types                           # TypeScript type definitions
│   ├── 📁 base                        # Base types
│   │   └── 📄 {name}.type.ts          # Type files
│   └── 📄 index.ts                    # Exports all types
│
└── ✅ validator-constraints           # Custom validators
    └── 📄 {name}.constraint.ts        # Validator constraint files
```

### 🧩 Module Directory

Contains feature modules that implement specific functionality domains.

```
📁 module
├── 👤 user                            # User management module
│   ├── 📦 entities                    # User entity definitions
│   │   ├── 📄 user.entity.ts          # User entity schema
│   │   └── 📄 user.subscriber.ts      # Entity lifecycle subscribers
│   │
│   ├── 📊 dto                         # User-specific DTOs
│   │   └── 📄 create-user-bulk.dto.ts # DTO for bulk user creation
│   │
│   ├── 🔣 constants                   # User-specific constants
│   │   ├── 📄 user.type.ts            # User type definitions
│   │   └── 📄 user.enum.ts            # User-related enums
│   │
│   ├── 🧪 test                        # User module tests e2e
│   │   ├── 📄 user.controller.spec.ts # Controller tests
│   │   └── 📄 user.service.spec.ts    # Service tests
│   │
│   ├── 🎭 decorator                   # User-specific decorators
│   │   ├── 📄 index.ts                # Exports all decorators
│   │   └── 📄 user.decorator.ts       # User decorators
│   │
│   ├── 🧪 pipes                       # User-specific pipes
│   │   ├── 📄 index.ts                # Exports all pipes
│   │   └── 📄 user.pipes.ts           # User pipes
│   │
│   ├── ✅ casl                        # User-specific CASL
│   │   ├── 📄 user-casl.guard.ts      # CASL policy guard
│   │   └── 📄 book-ability.factory.ts # CASL ability factory
│   │
│   ├── 📄 user.service.ts             # User business logic
│   ├── 📄 user.module.ts              # User module definition
│   └── 📄 user.controller.ts          # User API endpoints
│
└── ... other feature modules
```

## ❗Important Notes for Module Structure

1. **Single Responsibility per Module**:
    - Each module should have only one service, one controller, one entity, and one subscriber
    - This promotes clean separation of concerns and prevents modules from becoming too complex

2. **Extend Base Classes**:
    - Controller and service files should extend from base-service (except when truly not needed)
    - Example: export class UserController extends BaseController { ... }
    - This reduces code duplication and ensures consistent behavior across modules

3. **DTO and Type Inheritance**:
    - When creating or updating DTOs and types for a module, they should extend from entities or base DTOs
    - Example: `export class CreateUserDto extends BaseDto implements Partial<UserEntity> { ... }`
    - This ensures type consistency and reduces redundant code
    
4. **Centralized Type Exports**:
    - Types, enums, pipes, and decorators should always be exported to the File index in the corresponding folder in the common directory
    - This prevents duplicate definitions and makes these components easily accessible to other modules
    - Example: In `user.type.ts`, add `export * from '../../module/user/constants/user.type'`

### 📑 Template Directory

Contains template files for generating emails, PDFs, or other formatted content.

```
📁 template
└── 📄 {name}.hbs                      # Handlebars template files
```

### 🧪 Test Directory

Contains end-to-end tests and test configuration.

```
📁 test
├── 🧪 e2e                             # End-to-end tests
│   └── 📄 {name}.spec.ts              # E2E test files
└── 📄 jest-e2e.json                   # Jest configuration
```

### 📄 View Directory

Contains template files for server-side rendering.

```
📁 view
└── 📄 {name}.ejs                      # EJS template files
```

### 📜 Scripts Directory

Contains utility scripts for development, deployment, or other operations.

```
📁 scripts
└── 📜 {name}.sh                       # Shell script files
```

### 🐳 Docker Files

Files for containerization and orchestration.

```
🐳 Dockerfile                          # Docker image definition
📄 .dockerignore                       # Files to exclude from Docker context
📄 docker-compose.yml                  # Docker Compose configuration
📄 docker-compose.override.yml         # Environment-specific overrides
```

### 📋 Configuration Files

Various configuration files for the project.

```
📝 .env                                # Environment variables
📄 .gitignore                          # Git ignore patterns
📄 .gitlab-ci.yml                      # GitLab CI/CD configuration
📄 .prettierrc                         # Prettier code formatter config
📄 .eslintrc.js                        # ESLint configuration
📄 nest-cli.json                       # NestJS CLI configuration
📄 tsconfig.build.json                 # TypeScript build config
📄 tsconfig.json                       # TypeScript configuration
📄 sonar-project.properties            # SonarQube configuration
📄 package-lock.json                   # NPM dependency lock
📄 package.json                        # Project metadata and scripts
```

## 🔍 Key Concepts

### Modular Architecture

NestJS encourages a modular architecture where each feature is encapsulated in its own module with all necessary components.

### Separation of Concerns

Different aspects of functionality are separated into appropriate directories, making the codebase more maintainable.

### Consistent Naming

Files follow the `{feature}.{type}.ts` naming convention for clarity and consistency.

### Barrel Files (index.ts)

Index files are used to simplify imports and provide a clean public API for each directory.

## 🚀 Best Practices

1. **Domain-Driven Design**: Group related functionality together in feature modules
2. **Single Responsibility**: Each file should have a clear, focused purpose
3. **Test Coverage**: Write tests for all components to ensure functionality
4. **Documentation**: Include JSDoc comments in each file explaining usage
5. **Type Safety**: Leverage TypeScript's type system for better code quality


This structure follows NestJS best practices and provides a solid foundation for building scalable and maintainable REST APIs.