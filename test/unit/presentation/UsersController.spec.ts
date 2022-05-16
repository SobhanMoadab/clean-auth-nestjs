import { NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Response } from "express"
import { IUserRepository } from "../../../src/application/ports/IUsersRepository"
import { UsersUseCases } from "../../../src/application/use-cases/UsersUseCase"
import { User } from "../../../src/domain/User/User"
import { InMemoryRepository } from "../../../src/infrastructure/database/repositories/InMemoryRepository"
import { UsersController } from "../../../src/presentation/controllers/Users/UsersController"

describe('UsersController', () => {

    let usersUseCase: UsersUseCases
    let usersContoller: UsersController

    const USER = new User('sobhan', 'pass', 'test@email.com', 1)
    const USER_OBJECT = {
        id: 1,
        name: 'sobhan',
        password: 'password',
        email: 'test@email.com',
    } as User

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersUseCases,
                {
                    provide: 'IUserRepository',
                    useClass: InMemoryRepository
                    // useFactory: () => ({
                    //     createUser: jest.fn(() => true),
                    //     findUserById: jest.fn(() => true),
                    //     findUserByEmail: jest.fn(() => false),
                    //     updateUser: jest.fn(() => true),
                    //     findAllUsers: jest.fn(() => true),
                    // })
                }
            ]
        }).compile()
        usersContoller = module.get<UsersController>(UsersController)
        usersUseCase = module.get<UsersUseCases>(UsersUseCases)
    })


    it('should return 404 after not finding user with given id', async () => {


    })

    it('should return UserModel after creating user /users', async () => {
       const jfn = jest
            .spyOn(usersUseCase, 'createUser')
            .mockImplementation(async () => USER_OBJECT)

        const response = await usersContoller.createUser(USER_OBJECT)
        expect(response instanceof User)
        expect(jfn).toHaveBeenCalledTimes(1)
    })

    it('should return valid UserModel after hitting /users/:id ', async () => {

        jest
            .spyOn(usersUseCase, 'findUserById')
            .mockImplementation(async () => USER_OBJECT)
        const foundedUser = await usersContoller.findById(1)
        expect(foundedUser instanceof User)
    })

})