import { Router } from 'express';
import request from 'supertest';
import App from '../../../src/api/App';
import HealthController from '../../../src/api/controllers/health/HealthController';
import serverConfig from '../../../src/configs/server';

const controllers = [new HealthController(Router())];
const app = new App(controllers);
const mockDate = new Date('2020-01-01T00:00:00.000Z');

describe('GET /health', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockDate);
  });

  afterAll(() => {
    app.close();
    jest.clearAllTimers();
  });

  it('should return 200 and the correct metadata', async () => {
    const path = `${serverConfig.BASE_API_PATH}/health`;

    const { body, error } = await request(app.getApp())
      .get(path)
      .expect(200)
      .expect('Content-Type', /json/);

    const expected = {
      type: 'http',
      uptime: expect.any(Number),
      message: 'Ok',
      date: mockDate.toISOString(),
    };

    expect(body).toEqual(expected);
    expect(error).toBeFalsy();
  });
});
