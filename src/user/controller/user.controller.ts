import { HttpResponse } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';

import { UserEntity } from '../entities/user.entity';
import { UserServices } from '../services/user.services';

interface Respuesta {
  data: UserEntity | UserEntity[];
  message?: string;
}

export class UserController {
  constructor(
    private readonly userServices: UserServices = new UserServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getUsers(req: Request, res: Response<Respuesta>, next: any) {
    const usuarios = await this.userServices.findAll();

    if (usuarios.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, usuarios);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userServices.findUserById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe usuario');
    }

    return this.httpResponse.OK(res, data);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const data = await this.userServices.createUser(body);
    return res.status(201).json({ data });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userServices.deleteUser(id);
    if (!data.affected) {
      return this.httpResponse.NOT_FOUND(res, 'No existe usuario');
    }
    return this.httpResponse.OK(res, data, 'Usuario eliminado');
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.userServices.updateUser(id, body);
    if (!data.affected) {
      return this.httpResponse.NOT_FOUND(res, 'No existe usuario');
    }
    return this.httpResponse.OK(res, data, 'Usuario actualizado');
  }
}
