/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApplicationError from './ApplicationError';

/**
 * Error handler middleware
 * @param {Error} err Error
 * @param {Request} _req Request
 * @param {Response} res Response
 * @param {NextFunction} _next NextFunction
 * @returns {void} void
 */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApplicationError) {
    res.status(err.status).send({
      name: err.name,
      message: err.message,
      status: err.status,
    });

    return;
  }

  res.status(500).send({
    name: err.name,
    message: 'Something went wrong. Please try again.',
    status: 500,
  });
};

export default errorHandler;
