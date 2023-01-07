import { Router } from 'express';

export class baseRouter<T> {
  public router: Router;
  public controller: T;

  constructor(TController: { new (): T }) {
    this.router = Router();
    this.controller = new TController();
    this.routes();
  }

  routes(): void {
    return;
  }
}
