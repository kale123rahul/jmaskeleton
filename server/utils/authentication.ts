import { Request, Response } from 'express';
import { HttpError } from './http-error';

export function verifyUser(req: Request, res: Response, next: Function) {
  if (!req.isAuthenticated()) {
    next(new HttpError("Not authenticated", 401));
  } else {
    next();
  }
}
