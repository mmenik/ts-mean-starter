import { ExceptionFilter, Catch, UnauthorizedException, HttpCode, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { LogService } from '../../log/log.service';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: UnauthorizedException, host: ArgumentsHost) {
        this.log.info('UnauthorizedExceptionFilter');
        const ctx = host.switchToHttp();

        this.log.warn(`Unauthorized exception: ${JSON.stringify(exception.message)}`);
        ctx.getResponse().status(HttpStatus.UNAUTHORIZED).json(exception.message);
    }
}
