import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './application/middlewares/AuthMiddleware';
import { AuthModule } from './infrastructure/database/ioc/auth.module';
import { UsersModule } from './infrastructure/database/ioc/users.module';
import { User } from './infrastructure/database/mapper/UserEntity';

@Module({
  imports: [
    AuthModule,
    UsersModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgresUser',
      password: 'postgresPW',
      database: 'postgresDB',
      entities: [User],
      synchronize: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users')
  }
}
