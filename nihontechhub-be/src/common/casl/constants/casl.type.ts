import { Ability, AbilityBuilder, InferSubjects } from '@casl/ability';
import { Admin } from '@module/admin/entities/admin.entities';
import { News } from '@module/news/entities/news.entity';
import { PushNotification } from '@module/push-notification/entities/push-notification.entity';
import { User } from '@module/user/entities/user.entity';
import { Action } from './casl.enum';

export type Subjects =
  | InferSubjects<typeof User | typeof PushNotification | typeof News>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export type TSetPermission = {
  can?: AbilityBuilder<AppAbility>['can'];
  route: { path: string; methods: { delete: boolean } };
  params: any;
};

export type TSetPermissionAccessForAdmin = TSetPermission & {
  admin: Admin;
};

export type TSetPermissionAccessForUser = TSetPermission & {
  user: User;
};
