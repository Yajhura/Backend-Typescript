import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UtilsExpressConfig } from 'utils/utils-expres-config';

import { AppDataSource } from './data-sources';

export abstract class configServer {
  public configExpresUtils: UtilsExpressConfig = new UtilsExpressConfig();
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnviroment(k: string) {
    return process.env[k];
  }

  public getNumberEnviroment(k: string): number {
    return Number(process.env[k]);
  }

  public get nodeEnv(): string {
    return this.getEnviroment('NODE_ENV')?.trim() || '';
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ['env'];
    if (path.length > 0) {
      const stringToArray = path.split('.');
      arrEnv.unshift(...stringToArray);
    }
    return '.' + arrEnv.join('.');
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
