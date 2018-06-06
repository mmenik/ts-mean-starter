import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';
import { ConfigModel } from './config.model';

@Injectable()
export class ConfigService {
    public async getConfiguration(): Promise<ConfigModel> {
        const config: ConfigModel = {
            language: environment.language,
            theme: environment.theme,
        };

        return config;
    }
}