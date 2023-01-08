import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { DataSource } from 'typeorm';

import { configServer } from './config/index';
import { UserRouter } from './routes/user.router';

class ServerBosstrap extends configServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnviroment('PORT');

  constructor() {
    super();
    this.configExpress();
    this.listen();
    this.routes();
    this.dbConnect();
    this.app.use('/api', this.routes());
  }

  private configExpress() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    return;
  }

  private routes(): Array<express.Router> {
    return [new UserRouter().router];
  }

  public listen() {
    return this.app.listen(this.port, () => {
      return console.log(`Server is running on port ${this.port}\nhttp://localhost:${this.port}`);
    });
  }

  async dbConnect(): Promise<DataSource> {
    return await new DataSource(this.typeOrmConfig).initialize();
  }
}

new ServerBosstrap();
