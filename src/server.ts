import { UserRouter } from '@user/user.router';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { configServer } from './config/base_config';
import { globalErrorHandler } from './utils/global-error-handler';

class ServerBosstrap extends configServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnviroment('PORT');

  constructor() {
    super();
    this.configExpress();
    this.listen();
    this.routes();
    this.dbConnect()
      .then(() => this.configExpresUtils.Logger().info('Database connected'))
      .catch((err) => this.configExpresUtils.Logger().error(err));
    this.app.use('/api', this.routes());
    this.app.use(globalErrorHandler);
    this.app.use('*', this.configExpresUtils.NotFoundHandler);
    this.processDebug();
  }

  private configExpress() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());

    return;
  }

  private routes(): Array<express.Router> {
    return [new UserRouter().router];
  }

  public listen() {
    return this.app.listen(this.port, () => {
      this.configExpresUtils.Logger().info(`Server is running on port ${this.port}`);
      this.configExpresUtils.Logger().info(`http://localhost:${this.port}`);
      return;
    });
  }

  processDebug() {
    process
      .on('uncaughtException', (err) => {
        this.configExpresUtils.Logger().error(err);
        process.exit(1);
      })
      .on('unhandledRejection', (reason, p) => {
        this.configExpresUtils.Logger().error(`Unhandled Rejection at: Promise : ${p}, reason: ${reason}`);
      });
  }
}

new ServerBosstrap();
