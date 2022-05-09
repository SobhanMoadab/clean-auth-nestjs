import { User } from "src/domain/shared/models/User";

export const USER_REPOSITORY = 'IUserRepository'

export interface IUserRepository {
    createUser(user: User): Promise<User>
    // updateUser(user: User): Promise<void> 
    findUserById(id: string): Promise<User>
    findUserByEmail(email: string): Promise<User>
    findAllUsers(): Promise<User[]>
}