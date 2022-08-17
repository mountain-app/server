import {
  ApolloServer,
  ApolloServerExpressConfig,
  ServerRegistration,
} from 'apollo-server-express';
import App from './App';

class Server {
  private readonly server: ApolloServer;

  constructor(private readonly app: App, config: ApolloServerExpressConfig) {
    this.server = new ApolloServer(config);
  }

  async start(): Promise<void> {
    await this.server.start();
  }

  stop(): void {
    if (this.server) {
      this.server.stop();
    }
  }

  initializeMiddlewares(middlewares: ServerRegistration): void {
    this.server.applyMiddleware({
      ...middlewares,
      app: this.app.getApp(),
    });
  }
}

export default Server;
