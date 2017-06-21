import { Request, Response } from 'express';
import { HttpError } from '../../utils/http-error';


export * from './media-routes';

export function getCurrentUser(req: Request, res: Response, next: Function) {
    var user = req.user;
    if (user == null) {
        next(new HttpError("Not authenticated", 401));
    }
    res.json(user);
}
