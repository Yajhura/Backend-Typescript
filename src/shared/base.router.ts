import { Router } from 'express';

export class baseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middlewares: U;

  constructor(TController: { new (): T }, UMiddlewares: { new (): U }) {
    this.router = Router();
    this.controller = new TController();
    this.routes();
    this.middlewares = new UMiddlewares();
  }

  routes(): void {
    return;
  }
}
