import { User } from "src/domain/shared/models/User";
import { CreateUserDTO, UpdateUserDTO } from "src/presentation/controllers/Users/CreateUserDTO";

export const USER_REPOSITORY = 'IUserRepository'

export interface IUserRepository {
    createUser(user: User): Promise<User>
    updateUser(id: number, data: UpdateUserDTO): Promise<User>
    findUserById(id: number): Promise<User>
    findUserByEmail(email: string): Promise<User>
    findAllUsers(): Promise<User[]>
}