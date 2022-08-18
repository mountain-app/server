import { NextFunction, Request, Response, Router } from 'express';
import Prisma from '../../../clients/Prisma';
import logger from '../../../logger';
import { ConflictError } from '../../errors/application-errors/ConflictError';
import Controller from '../Controller';

class RestrictedController implements Controller {
  readonly path: string = '/restricted';

  constructor(readonly router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/users`, this.createUser);
  }

  private async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    /**
     * @todo Add firebase app check
     * @todo Use redis
     * @todo evaluate if its better to use a rest api or a graphql api (probably graphql)
     */
    const { id, name, email } = req.body;
    try {
      const existingUser = await Prisma.getInstance().user.findFirst({
        where: {
          OR: [{ email }, { id }],
        },
      });
      if (existingUser) {
        logger.error(`User with id ${id} or email ${email} already exists`);

        throw new ConflictError('User already exists');
      }

      const user = await Prisma.getInstance().user.create({
        data: {
          id,
          name,
          email,
        },
      });

      logger.info(`User with id ${id} created`);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }
}

export default RestrictedController;
