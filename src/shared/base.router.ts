import { Router } from 'express';

export class baseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middlewares: U;

  constructor(TController: { new (): T }, UMiddleware: { new (): U }) {
    this.router = Router();
    this.controller = new TController();
    this.middlewares = new UMiddleware();
    this.routes();
  }

  routes(): void {
    return;
  }
}
