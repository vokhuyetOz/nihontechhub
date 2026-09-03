import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CheckAppVersionDto } from './dto/check-app-version.dto';
import { AppVersionEntity } from './entities/app-version.entity';
import { BaseMySqlService } from '@common/services';
import { EOperatingSystem } from '@common/enums';

@Injectable()
export class AppVersionService extends BaseMySqlService<AppVersionEntity> {
  constructor(
    @InjectRepository(AppVersionEntity)
    repository: EntityRepository<AppVersionEntity>,
  ) {
    super(repository);
  }

  async check({ os, version }: CheckAppVersionDto) {
    const versions = await this.repository.findAll();

    if (!versions.length) return { require: false };

    const db = versions[0];
    if (!db) {
      return { require: false };
    }

    const dbVersion = {
      [EOperatingSystem.ANDROID]: {
        version: db.androidVersion,
        title: db.androidTitle,
        description: db.androidDescription,
        require: db.androidRequire,
        link: db.androidLink,
      },
      [EOperatingSystem.IOS]: {
        version: db.iosVersion,
        title: db.iosTitle,
        description: db.iosDescription,
        require: db.iosRequire,
        link: db.iosLink,
      },
    }[os];

    //if not require to update
    if (!dbVersion.require) {
      return false;
    }
    //convert x.x.x => [x,x,x]
    const appVerionsArray = version.split('.');
    const dbVerionsArray = dbVersion.version.split('.');

    for (const i in appVerionsArray) {
      const appI = Number.parseInt(appVerionsArray[i]) || 0;
      const dbI = Number.parseInt(dbVerionsArray[i]) || 0;
      if (dbI > appI) {
        return dbVersion;
      }
      if (appI > dbI) {
        return { require: false };
      }
    }
    return { require: false };
  }
}
