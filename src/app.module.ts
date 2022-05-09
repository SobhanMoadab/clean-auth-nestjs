import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './infrastructure/database/ioc/auth.module';
import { UsersModule } from './infrastructure/database/ioc/users.module';
import { User } from './infrastructure/database/mapper/UserEntity';

@Module({
  imports: [
    AuthModule,
    UsersModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5455,
      username: 'postgresUser',
      password: 'postgresPW',
      database: 'postgresDB',
      entities: [User],
      synchronize: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
