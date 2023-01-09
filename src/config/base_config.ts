import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export abstract class configServer {
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
  public get typeOrmConfig(): DataSourceOptions {
    return {
      type: 'mysql',
      port: this.getNumberEnviroment('DB_PORT'),
      host: this.getEnviroment('DB_HOST'),
      username: this.getEnviroment('DB_USER'),
      password: this.getEnviroment('DB_PASSWORD'),
      database: this.getEnviroment('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
