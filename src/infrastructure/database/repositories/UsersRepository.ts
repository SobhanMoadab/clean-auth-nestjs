import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/application/ports/IUsersRepository";
import { User } from "src/domain/shared/models/User";
import { Repository } from "typeorm";
import { User as UserEntity } from "../mapper/UserEntity";

@Injectable()
export class UsersRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>
    ) { }
    public async createUser(user: User): Promise<User> {
        const createdUser = await this.usersRepository.save(user)
        return createdUser
    }

    public async findUserById(id: string): Promise<User> {
        throw new Error()
    }

    public async findUserByEmail(email: string): Promise<User> {
        const findOrEmpty = await this.usersRepository.findOneBy({ email })
        return findOrEmpty
    }

    public async findAllUsers(): Promise<User[]> {
        const findAllUsers = await this.usersRepository.find()
        return findAllUsers
    }
} 