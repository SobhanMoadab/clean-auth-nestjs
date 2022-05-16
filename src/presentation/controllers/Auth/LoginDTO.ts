import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/domain/User/User";

export class LoginDTO {

    @IsString()
    @IsNotEmpty()
    password: string 


    @IsEmail()
    @IsNotEmpty()
    email: string 

}