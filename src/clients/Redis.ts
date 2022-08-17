import { createClient, RedisClientType } from 'redis';
import redisConfig from '../configs/redis';

export enum RedisKey {
  USER_PREFIX = 'user:',
}

class Redis {
  private static instance: RedisClientType;

  private constructor() {}

  static getInstance(): RedisClientType {
    if (!Redis.instance) {
      Redis.instance = createClient(redisConfig);
    }

    return Redis.instance;
  }
}

export default Redis;
