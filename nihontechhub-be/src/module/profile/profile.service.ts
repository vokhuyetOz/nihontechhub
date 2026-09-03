import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { Profile } from './entities/profile.entity';
import { BASE_PROFILE_ERROR } from './error';

@Injectable()
export class ProfileService extends BaseMySqlService<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly repo: EntityRepository<Profile>,
  ) {
    super(repo, BASE_PROFILE_ERROR);
  }
}
