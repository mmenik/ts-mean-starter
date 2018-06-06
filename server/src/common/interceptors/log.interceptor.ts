import { NestInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from '../../log/log.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {

    constructor(private readonly log: LogService) { }

    intercept(
        context: ExecutionContext, call$: Observable<any>): Observable<any> {
        this.log.debug(`Start process api url: ${context.switchToHttp()
            .getRequest().originalUrl}, method:${context.switchToHttp().getRequest().method}`);
        const now = Date.now();
        return call$.pipe(
            tap(() => this.log.debug(`End process api url:${context.switchToHttp()
                .getRequest().originalUrl}, method:${context.switchToHttp().getRequest().method} in ${Date.now() - now}ms`)),
        );
    }
    // intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    //     this.log.debug(`Start process api url:${dataOrRequest.originalUrl}, method:${dataOrRequest.method}`);
    //     const now = Date.now();
    //     return stream$.do(
    //         () => this.log.debug(
    //             `End process api url:${dataOrRequest.originalUrl}, method:${dataOrRequest.method} in ${Date.now() - now}ms`),
    //     );
    // }
}
