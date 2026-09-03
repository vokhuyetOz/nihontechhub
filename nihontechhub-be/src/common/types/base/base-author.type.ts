import { Admin } from 'src/module/admin/entities/admin.entities';
import { User } from 'src/module/user/entities/user.entity';

export type TAuthor = Admin | User;

export type TResponseAddRelation = { user: User } | { admin: Admin };
