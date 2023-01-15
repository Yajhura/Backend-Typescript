import { EntityTarget, Repository } from 'typeorm';

import { BaseEntity } from './base.entity';
import { configServer } from './base_config';

export class BaseServices<T extends BaseEntity> extends configServer {
  public execRepository: Promise<Repository<T>>;
  constructor(private getEntity: EntityTarget<T>) {
    super();
    this.execRepository = this.initRepository(getEntity);
  }
  //eslint-disable-next-line
  //@ts-ignore
  async initRepository<T>(e: EntityTarget<T>): Promise<Repository<T>> {
    const getConn = await this.initConnect;
    //eslint-disable-next-line
    //@ts-ignore
    return getConn.getRepository(e);
  }
}
