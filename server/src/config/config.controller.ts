import { Controller, UseInterceptors, Get } from '@nestjs/common';
import { apiPath } from '../api.path';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigModel } from './config.model';
import { ConfigService } from './config.service';
import { ConfigDto } from './config.dto';

@ApiUseTags('Config')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'config'))
export class ConfigController {
    constructor(private readonly configService: ConfigService) { }

    @ApiOperation({ title: 'Get configuration' })
    @ApiResponse({ status: 200, description: 'Return configuration.', type: ConfigDto })
    @Get()
    async getConfig(): Promise<ConfigModel> {
        return await this.configService.getConfiguration();
    }
}