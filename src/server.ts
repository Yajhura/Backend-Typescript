import 'reflect-metadata';

import { CategoryRouter } from '@category/category.router';
import { CustomerRouter } from '@customer/customer.router';
import { productRouter } from '@product/product.router';
import { PurchaseRouter } from '@purchase/purchase.router';
import { UserRouter } from '@user/user.router';
import { AuthRouter } from 'auth/auth.router';
import { JWTStrategy } from 'auth/strategies/jwt.strategy';
import { LoginStrategy } from 'auth/strategies/login.strategy';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { DataSource } from 'typeorm';
import { errorLogs } from 'utils/utils-expres-config';

import { configServer } from './config/base_config';
import { PurchaseProductRouter } from './purchase/purchase-product.router';
import { globalErrorHandler } from './utils/global-error-handler';

class ServerBosstrap extends configServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnviroment('PORT');

  constructor() {
    super();

    this.configExpress();
    this.passportUse();
    this.dbConnect();
    this.routes();
    this.app.use('/api', this.routes());
    this.app.use(errorLogs);
    this.app.use(globalErrorHandler);
    this.app.use('*', this.configExpresUtils.NotFoundHandler);
    this.processDebug();
    this.listen();
  }

  private configExpress() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());

    return;
  }

  passportUse() {
    return [new LoginStrategy().use, new JWTStrategy().use];
  }

  private routes(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CategoryRouter().router,
      new CustomerRouter().router,
      new productRouter().router,
      new PurchaseRouter().router,
      new PurchaseProductRouter().router,
      new AuthRouter().router,
    ];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        return this.configExpresUtils.Logger().info('Database connected');
      })
      .catch((err) => {
        this.configExpresUtils.Logger().error(err);
      });
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
        console.log('houve um erro');
        this.configExpresUtils.Logger().error(`Unhandled Rejection at: Promise : ${p}, reason: ${reason}`);
      });
  }
}

new ServerBosstrap();
