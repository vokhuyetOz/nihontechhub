import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ERole } from '../enums';

@Injectable()
@ValidatorConstraint({
  name: 'CheckRoleIsNotAdmin',
  async: true,
})
export class CheckRoleIsNotAdmin implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    try {
      return value === ERole.USER;
    } catch (e) {
      return false;
    }
  }
}
