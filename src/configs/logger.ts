import { LoggerOptions } from 'pino';

const loggerConfig: LoggerOptions = {
  timestamp: true,
  enabled: process.env.NODE_ENV !== 'test',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
          },
        }
      : undefined,
};

export default loggerConfig;
