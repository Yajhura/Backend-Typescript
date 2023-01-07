import { Request, Response } from 'express';

export class UserController {
  getUsers(req: Request, res: Response) {
    res.status(201).json({ message: 'getUsers' });
  }
}
