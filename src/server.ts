import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { UserRouter } from './routes/user.router';

class ServerBosstrap {
  public app: express.Application = express();
  private port = 4271;

  constructor() {
    this.config();
    this.listen();
    this.routes();
    this.app.use('/api', this.routes());
  }

  private config() {
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
}

new ServerBosstrap();
