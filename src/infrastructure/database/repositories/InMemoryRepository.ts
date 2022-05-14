import { IUserRepository } from "../../../application/ports/IUsersRepository";
import { User } from "../../../domain/shared/models/User";
import { UpdateUserDTO } from "../../../presentation/controllers/Users/CreateUserDTO";

export class InMemoryRepository implements IUserRepository {

    public users: any[]

    constructor() {
        this.users = []
    }
    async findUserById(id: number): Promise<User> {
        try {
            const user = this.users.find((user) => id === user.id)
            return user
        } catch (err) {
            throw new Error()
        }
    }

    findAllUsers(): Promise<User[]> {
        throw new Error()
    }

    findUserByEmail(email: string): Promise<User> {
        try {
            const user = this.users.find((user) => email === user.email)
            return user
        } catch (err) {
            throw new Error()
        }
    }

    createUser(user: User): Promise<User> {
        this.users.push(user)
        return Promise.resolve(user)
    }

    updateUser(id: number, data: UpdateUserDTO): Promise<User> {
        throw new Error()
    }
}