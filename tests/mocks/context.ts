import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { RedisClientType } from 'redis';

export interface MockContext {
  req: DeepMockProxy<Request>;
  res: DeepMockProxy<Response>;
  redis: DeepMockProxy<RedisClientType>;
  prisma: DeepMockProxy<PrismaClient>;
}

export const createMockContext = (): MockContext => ({
  req: mockDeep<Request>(),
  res: mockDeep<Response>(),
  redis: mockDeep<RedisClientType>(),
  prisma: mockDeep<PrismaClient>(),
});
