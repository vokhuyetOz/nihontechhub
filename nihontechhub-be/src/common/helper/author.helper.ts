import { User } from 'src/module/user/entities/user.entity';
import { EAuthorRole } from '../enums';
import { TAuthor, TResponseAddRelation } from '../types';
import { Admin } from 'src/module/admin/entities/admin.entities';

export const AuthorHelper = {
  getEAuthorRole(author: TAuthor): EAuthorRole {
    if (author instanceof User) return EAuthorRole.USER;
    if (author instanceof Admin) return EAuthorRole.ADMIN;
    return EAuthorRole.USER;
  },

  getAddRelation(author: TAuthor): TResponseAddRelation {
    if (author instanceof User) return { user: author };
    if (author instanceof Admin) return { admin: author };
  },

  getFieldAuthor(author: TAuthor): string {
    if (author instanceof User) return 'user.id';
    if (author instanceof Admin) return 'admin.id';
  },

  getTypeAuthor(authorRole: EAuthorRole) {
    const options = {
      [EAuthorRole.USER]: User,
      [EAuthorRole.ADMIN]: Admin,
    };
    return options[authorRole];
  },
};
