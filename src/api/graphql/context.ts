import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import { RedisClientType } from 'redis';
import Prisma from '../../clients/Prisma';
import Redis from '../../clients/Redis';
import logger from '../../logger';
import { getUserId } from './auth/utils/getUserId';

export interface Context {
  req: Request;
  res: Response;
  redis: RedisClientType;
  prisma: PrismaClient;
  user?: User;
}

const createContext = async (req: Request, res: Response): Promise<Context> => {
  const userId = await getUserId(req);
  const context: Context = {
    req,
    res,
    redis: Redis.getInstance(),
    prisma: Prisma.getInstance(),
  };

  if (userId) {
    try {
      const user =
        (await context.prisma.user.findUnique({
          where: { id: userId },
        })) || undefined;

      context.user = user;
    } catch (error) {
      logger.error(error);
    }
  }

  return context;
};

export default createContext;
