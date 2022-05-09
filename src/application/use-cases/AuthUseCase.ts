import { HttpException, Inject } from "@nestjs/common";
import { User } from "src/domain/shared/models/User";
import { LoginDTO } from "src/presentation/controllers/Auth/LoginDTO";
import { IUserRepository, USER_REPOSITORY } from "../ports/IUsersRepository";



export class AuthUseCases {

    constructor(@Inject(USER_REPOSITORY) private readonly usersRepository: IUserRepository) { }


    async login(dto: LoginDTO){
        // find user by email
        const findUser = await this.usersRepository.findUserByEmail(dto.email)
        if(!findUser) throw new HttpException('Could not find anyone with given email', 404)
        const comparedResult = await User.comparePassword(findUser.password, dto.password)
        if(!comparedResult) throw new HttpException('Password or email is incorrect', 400)
        // compare

        return findUser
    }
}