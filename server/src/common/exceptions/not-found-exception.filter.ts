import { Catch, NotFoundException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { LogService } from '../../log/log.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: NotFoundException, host: ArgumentsHost) {
        this.log.info('NotFoundExceptionFilter');
        const ctx = host.switchToHttp();

        this.log.info(`Render to index`);
        return await ctx.getResponse().render('index');
    }
}
