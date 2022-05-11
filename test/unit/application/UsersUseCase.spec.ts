import { IUserRepository } from '../../../src/application/ports/IUsersRepository'
import { User } from '../../../src/domain/shared/models/User'
import { Test } from '@nestjs/testing'
import { UsersUseCases } from '../../../src/application/use-cases/UsersUseCase'
import { UpdateResult } from 'typeorm'


describe('UsersUseCase', () => {

    let usersRepository: IUserRepository
    let usersUseCase: UsersUseCases

    const USER = new User('sobhan', 'pass', 'test@email.com', 1)
    const USER_OBJECT = {
        id: 1,
        name: 'sobhan',
        password: 'password',
        email: 'test@email.com',
    } as User

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersUseCases,
                {
                    provide: 'IUserRepository',
                    useFactory: () => ({
                        createUser: jest.fn(() => true),
                        findUserById: jest.fn(() => true),
                        findUserByEmail: jest.fn(() => false),
                        updateUser: jest.fn(() => true),
                        findAllUsers: jest.fn(() => true),
                    })
                }
            ]
        }).compile()

        usersRepository = module.get<IUserRepository>('IUserRepository')
        usersUseCase = module.get<UsersUseCases>(UsersUseCases)
    })

    it('should create a user when valid user is passed in createUser', async () => {
        jest.
            spyOn(usersRepository, 'createUser')
            .mockImplementation(async () => USER_OBJECT)

        const user = await usersUseCase.createUser(USER_OBJECT)
        expect(user instanceof User)
        expect(user).toBe(USER_OBJECT)
    })

    it('should get a user when valid id is passed in findUserByIdّ', async () => {
        jest
            .spyOn(usersRepository, 'findUserById')
            .mockImplementation(async () => USER_OBJECT)

        const foundedUser = await usersUseCase.findUserById(1)
        expect(foundedUser instanceof User)
        expect(foundedUser).toBe(USER_OBJECT)
    })

    it('should find all users', async () => {
        jest
            .spyOn(usersRepository, 'findAllUsers')
            .mockImplementation(async () => [USER_OBJECT])

        const allUsers = await usersUseCase.findAllUsers()
        expect(allUsers).toHaveLength(1)
        expect(allUsers).toStrictEqual([USER_OBJECT])
    })

    it('should return true when user is updated', async () => {
        jest
            .spyOn(usersRepository, 'updateUser')
            .mockImplementation(async () => USER_OBJECT as User)

        const updated = await usersUseCase.updateUser(USER_OBJECT.id, USER_OBJECT)
        expect(updated instanceof User)
        expect(updated).toBe(USER_OBJECT)
    })

})