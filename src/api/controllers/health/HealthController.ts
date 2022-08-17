import { Request, Response, Router } from 'express';
import Controller from '../Controller';

interface HealthCheckResponse {
  type: 'http' | 'db';
  uptime: number;
  message: 'Ok';
  date: Date;
}

class HealthController implements Controller {
  readonly path: string = '/health';

  constructor(readonly router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getHealth);
  }

  private getHealth(_: Request, res: Response): void {
    const response: HealthCheckResponse = {
      type: 'http',
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    };

    res.status(200).send(response);
  }
}

export default HealthController;
