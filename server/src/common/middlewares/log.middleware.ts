import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../../log/log.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {

    constructor(private readonly log: LogService) { }

    resolve(param: string): MiddlewareFunction {
        return (req: Request, res: Response, next: NextFunction) => {
            this.log.debug(`${param} url:${req.baseUrl}, method:${req.method}, body:${JSON.stringify(req.body)}`);
            next();
        };
    }
}
