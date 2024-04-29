import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    name: string;

    surname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
