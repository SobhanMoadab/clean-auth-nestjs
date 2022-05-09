import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPOSITORY, } from "src/application/ports/IUsersRepository";
import { UsersUseCases } from "src/application/use-cases/UsersUseCase";
import { UsersController } from "src/presentation/controllers/Users/UsersController";
import { User } from "../mapper/UserEntity";
import { UsersRepository } from "../repositories/UsersRepository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersUseCases,
        { provide: USER_REPOSITORY, useClass: UsersRepository }
    ]
})
export class UsersModule { }