import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersUseCases } from "src/application/use-cases/UsersUseCase";
import { CreateUserDTO } from "./CreateUserDTO";

@Controller('users')
export class UsersController {
    constructor(private readonly usersUseCases: UsersUseCases) { }

    @Post('/')
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.usersUseCases.createUser(createUserDTO)
        return newUser
    }

    @Get('/')
    async allUsers(){
        const findAllUsers = await this.usersUseCases.findAllUsers()
        return findAllUsers
    }
}