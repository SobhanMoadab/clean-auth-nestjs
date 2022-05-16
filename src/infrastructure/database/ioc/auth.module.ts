import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPOSITORY, } from "src/application/ports/IUsersRepository";
import { AuthUseCases } from "src/application/use-cases/AuthUseCase";
import { UsersUseCases } from "src/application/use-cases/UsersUseCase";
import { AuthController } from "src/presentation/controllers/Auth/AuthController";
import { User } from "../mapper/UserEntity";
import { UsersRepository } from "../repositories/UsersRepository";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'COMMUNICATION',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'email-queue',
                    queueOptions: {
                        durable: true
                    },
                }
            }
        ]),
        TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        AuthUseCases,
        UsersUseCases,
        { provide: USER_REPOSITORY, useClass: UsersRepository }
    ]
})
export class AuthModule { }