import { Body, Controller, Get, HttpException, NotFoundException, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UsersUseCases } from "../../../application/use-cases/UsersUseCase";
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
    async allUsers() {
        const findAllUsers = await this.usersUseCases.findAllUsers()
        if (!findAllUsers[0]) throw new HttpException('User list is empty', 404)
        return findAllUsers
    }

    @Get('/:id')
    async findById(@Param() id: number) {
        const foundedUser = await this.usersUseCases.findUserById(id)
        if (!foundedUser) throw new NotFoundException()
        return foundedUser
    }

}