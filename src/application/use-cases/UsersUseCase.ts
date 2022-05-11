import { HttpException, Inject } from "@nestjs/common";
import { User } from "src/domain/shared/models/User";
import { CreateUserDTO, UpdateUserDTO } from "src/presentation/controllers/Users/CreateUserDTO";
import { IUserRepository, USER_REPOSITORY } from "../ports/IUsersRepository";



export class UsersUseCases {

    constructor(@Inject(USER_REPOSITORY) private readonly usersRepository: IUserRepository) { }

    async createUser(user: User): Promise<User> {
        // check for existance and stuff like that
        const foundedUser = await this.usersRepository.findUserByEmail(user.email)
        console.log({foundedUser})
        if (foundedUser) throw new HttpException('User exists with given email', 401)
        return await this.usersRepository.createUser(user)
    }

    async findAllUsers(): Promise<User[]> {
        return await this.usersRepository.findAllUsers()
    }

    async findUserById(id: number): Promise<User> | null {
        return await this.usersRepository.findUserById(id)
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
        return await this.usersRepository.updateUser(id, data)
    }
}