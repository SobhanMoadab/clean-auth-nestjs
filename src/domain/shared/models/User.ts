import { compare } from 'bcrypt'

export class User {
    id?: number

    name: string

    password: string

    email: string

    constructor(name: string, password: string, email: string, id?: number
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    static async comparePassword(old: string, given: string) {
        const result = await compare(given, old)
        return result
    }
}