import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ApiError } from '../service/error.service';

export function clientErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ mesasge: 'Error on server 500...' });
}
