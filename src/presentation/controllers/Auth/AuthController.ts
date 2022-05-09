import { Body, Controller, Post, Put } from "@nestjs/common";
import { UsersUseCases } from "src/application/use-cases/UsersUseCase";
import { CreateUserDTO } from "../Users/CreateUserDTO";
import { hash } from 'bcrypt'
import { LoginDTO } from "./LoginDTO";
import { AuthUseCases } from "src/application/use-cases/AuthUseCase";
import { sign } from 'jsonwebtoken'

@Controller('auth')
export class AuthController {
    constructor(private readonly usersUseCases: UsersUseCases, private readonly authUseCases: AuthUseCases) { }

    @Post('/')
    async register(@Body() body: CreateUserDTO) {

        const dto = {
            name: body.name,
            email: body.email,
            password: await hash(body.password, 10),
        }
        const newUser = await this.usersUseCases.createUser(dto)
        const token = sign(newUser, process.env.JWT)
        await this.usersUseCases.updateUser(newUser.id, { token })
        return { newUser, token }
    }

    @Put('/')
    async login(@Body() dto: LoginDTO) {
        // return token
        const foundedUser = await this.authUseCases.login(dto)
        return foundedUser
    }
}