import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as express from 'express';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { NotFoundExceptionFilter } from './common/exceptions/not-found-exception.filter';
import { LogModule } from './log/log.module';
import { LogService } from './log/log.service';
import { environment } from './environments/environment';
import { UnauthorizedExceptionFilter } from './common/exceptions/unauthorized-exception.filter';

// import 'rxjs/add/observable/throw';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/observable/of';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/delay';

const expressApp: express.Application = express();
expressApp.use(express.static(path.join(process.cwd(), 'dist')));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, expressApp, {});

  const log = app.select(LogModule).get(LogService);
  app.useGlobalFilters(new NotFoundExceptionFilter(log),
    new UnauthorizedExceptionFilter(log));

  app.useStaticAssets(path.join(process.cwd(), 'dist'));
  app.setBaseViewsDir(path.join(process.cwd(), 'dist'));

  app.setViewEngine('hbs');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TS Mean Starter Sample APIs')
    .addTag('Auth')
    .addTag('Config')
    .addTag('Users')
    .addTag('Bags')
    .setDescription('Sample REST API that allows to manage list of users')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, swaggerDocument);

  await app.listen(3000, () => {
    log.info(`Application is listining on port ${environment.port} in ${process.env.NODE_ENV} mode.`);
  });
}
bootstrap();
