import { Inject } from "@nestjs/common";
import { User } from "src/domain/shared/models/User";
import { IUserRepository, USER_REPOSITORY } from "../ports/IUsersRepository";



export class UsersUseCases {

    constructor(@Inject(USER_REPOSITORY) private readonly usersRepository: IUserRepository) { }

    async createUser(user: User): Promise<User> {
        // check for existance and stuff like that
        return await this.usersRepository.createUser(user)
    }

    async findAllUsers(): Promise<User[]>{
        return await this.usersRepository.findAllUsers()
    }
}