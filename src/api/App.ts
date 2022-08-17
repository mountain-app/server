import express, { Application } from 'express';
import { Server } from 'http';
import Controller from './controllers/Controller';
import serverConfig from '../configs/server';
import logger from '../logger';

class App {
  private app: Application;

  private server!: Server;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeControllers(controllers);
  }

  listen(port: number): Server {
    this.server = this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });

    return this.server;
  }

  close(): void {
    if (this.server) {
      this.server.close();
    }
  }

  getApp(): Application {
    return this.app;
  }

  getServer(): Server {
    return this.server;
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(serverConfig.BASE_API_PATH, controller.router);
    });
  }
}

export default App;
