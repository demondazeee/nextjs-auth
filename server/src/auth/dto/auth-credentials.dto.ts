import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    @IsAlphanumeric()
    password: string
}