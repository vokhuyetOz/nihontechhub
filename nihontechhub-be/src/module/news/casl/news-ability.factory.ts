import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Action } from '@common/enums';
import {
  AppAbility,
  Subjects,
  TAuthor,
  TSetPermissionAccessForAdmin,
  TSetPermissionAccessForUser,
} from '@common/types';
import { Admin } from '@module/admin/entities/admin.entities';
import { User } from '@module/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { News } from '../entities/news.entity';
import { NewsService } from '../news.service';

@Injectable()
export class NewsCaslAbilityFactory {
  constructor(private readonly newsService: NewsService) {}

  setPermissionForAdmin({ can }: TSetPermissionAccessForAdmin) {
    can(Action.Manage, News);
  }

  async setPermissionForUser({
    can,
    user,
    route,
    params,
  }: TSetPermissionAccessForUser) {
    if (route.path.includes('news/:id')) {
      const isExist = await this.newsService.getOneWithoutValidate({
        fields: ['id'],
        filter: [
          { field: 'user', operator: '$eq', value: user.id },
          {
            field: 'id',
            operator: '$eq',
            value: params,
          },
        ],
      });

      if (isExist) {
        can(Action.Read, News);
        can(Action.Update, News);
      }
    }
  }

  async createForNews(
    author: TAuthor,
    route: { path: string; methods: { delete: boolean } },
    params: any,
  ) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (author instanceof Admin) {
      this.setPermissionForAdmin({ can, admin: author, route, params });
    }

    if (author instanceof User) {
      await this.setPermissionForUser({ can, user: author, route, params });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
