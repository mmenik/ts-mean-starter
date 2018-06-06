import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { LogMiddleware } from './common/middlewares/log.middleware';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagModule } from './bag/bag.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from './config/config.module';

const environment = require(`./environments/environment${process.env.NODE_ENV === 'production' ? '.prod' : ''}`).environment;

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mean-nest-starter'),
    TypeOrmModule.forRoot(environment.orm),
    BagModule,
    LogModule,
    AuthModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware)
      .with('Request api')
      .forRoutes(AuthController, UserController);
  }
}
