import { EntityManager, EntityRepository, raw } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { Count } from './entities/count.entity';
@Injectable()
export class CountService extends BaseMySqlService<Count> {
  constructor(
    @InjectRepository(Count)
    private readonly repo: EntityRepository<Count>,
    protected readonly em: EntityManager,
  ) {
    super(repo);
  }

  async getCount(nameTable: string): Promise<number> {
    const count = await this.repo.findOne({ nameTable });
    if (count) {
      return count.count || 0;
    }
    return 0;
  }

  async incrementCount(nameTable: string): Promise<void> {
    const result = await this.em
      .createQueryBuilder(Count)
      .update({ count: raw('count + 1') })
      .where({ nameTable })
      .execute();

    if (result.affectedRows === 0) {
      await this.createOne({ nameTable, count: 1 });
    }
  }

  async decrementCount(nameTable: string): Promise<void> {
    await this.em
      .createQueryBuilder(Count)
      .update({ count: raw('count - 1') })
      .where({ nameTable })
      .execute();
  }
}
