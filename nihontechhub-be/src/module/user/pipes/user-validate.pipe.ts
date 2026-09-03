import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { BASE_USER_ERROR, USER_ERROR } from 'src/common/errors';
import { VALIDATE_BASE_KEY } from 'src/common/metadata/base-validate.metadata';
import { TBaseMetadata, TValidateUser } from 'src/common/types';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class UserValidatePipe implements PipeTransform {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async transform(value: any) {
    const {
      DUPLICATE_RECORD,
      NOT_FOUND,
      NOT_ACTIVE_RECORD,
      SOFT_DELETE_FAILED,
    } = BASE_USER_ERROR;
    const { NOT_MATCH_PASSWORD } = USER_ERROR;
    const metadata: TBaseMetadata<TValidateUser, User> =
      this.request[VALIDATE_BASE_KEY];

    if (!metadata) {
      return value;
    }
    const { mapTypes, keyFind } = metadata;
    const user: User = await this.userService.getOne({
      filter: [{ field: keyFind, operator: '$eq', value: value[`${keyFind}`] }],
    });
    if (mapTypes.has('duplicate') && user) {
      throw new BadRequestException(DUPLICATE_RECORD.message, {
        description: DUPLICATE_RECORD.code,
      });
    }
    if (mapTypes.has('exists') && !user) {
      throw new NotFoundException(NOT_FOUND.message, {
        description: NOT_FOUND.code,
      });
    }
    if (mapTypes.has('active') && !user?.active) {
      throw new BadRequestException(NOT_ACTIVE_RECORD.message, {
        description: NOT_ACTIVE_RECORD.code,
      });
    }
    if (mapTypes.has('deleted') && user?.deletedAt) {
      throw new BadRequestException(SOFT_DELETE_FAILED.message, {
        description: SOFT_DELETE_FAILED.code,
      });
    }
    if (mapTypes.has('password')) {
      const isPasswordMatching: boolean = await bcrypt.compare(
        value?.password,
        user?.password,
      );
      if (!isPasswordMatching) {
        throw new BadRequestException(NOT_MATCH_PASSWORD.message, {
          description: NOT_MATCH_PASSWORD.code,
        });
      }
    }
    this.request['user'] = user;
    return value;
  }
}
