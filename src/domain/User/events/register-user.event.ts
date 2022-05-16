import { User } from "../User";

export class RegisterUserEvent {
    constructor(private readonly user: Omit<User, 'password'>){}
}