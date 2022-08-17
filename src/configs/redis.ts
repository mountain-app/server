import { RedisClientOptions, RedisModules } from 'redis';

const redisConfig: RedisClientOptions<
  RedisModules,
  Record<string, never>,
  Record<string, never>
> = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD || 'redis',
};

export default redisConfig;
