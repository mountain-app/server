import { Router } from 'express';
import HealthController from './api/controllers/health/HealthController';
import App from './api/App';
import apolloConfig from './configs/apollo';
import serverConfig from './configs/server';
import Server from './api/Server';
import RestrictedController from './api/controllers/restricted/RestrictedController';
// import Redis from './clients/Redis';
// import logger from './logger';

const main = async (): Promise<void> => {
  const router = Router();
  // const redis = Redis.getInstance();

  const app = new App([
    new HealthController(router),
    new RestrictedController(router),
  ]);
  const apolloServer = new Server(app, apolloConfig);

  await apolloServer.start();

  apolloServer.initializeMiddlewares({
    app: app.getApp(),
    path: serverConfig.BASE_API_PATH,
    cors: {
      origin: serverConfig.CORS_ORIGIN,
      credentials: true,
    },
  });

  //   await redis.connect().then(() => {
  //     logger.info('Redis connected');
  //   });

  app.listen(+serverConfig.PORT);

  process.once('SIGTERM', async () => {
    // await redis.quit();

    apolloServer.stop();
    app.close();
  });
};

main();
