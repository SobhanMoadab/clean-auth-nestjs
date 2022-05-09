import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPOSITORY, } from "src/application/ports/IUsersRepository";
import { AuthUseCases } from "src/application/use-cases/AuthUseCase";
import { UsersUseCases } from "src/application/use-cases/UsersUseCase";
import { AuthController } from "src/presentation/controllers/Auth/AuthController";
import { User } from "../mapper/UserEntity";
import { UsersRepository } from "../repositories/UsersRepository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        AuthUseCases,
        UsersUseCases,
        { provide: USER_REPOSITORY, useClass: UsersRepository }
    ]
})
export class AuthModule { }