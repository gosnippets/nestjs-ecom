import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { Unique } from 'typeorm';

@Unique(['username', 'email'])
export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
    password: string;
 
    // @IsNotEmpty({ message: 'Role is required' })
    // @IsEnum(Role)
    role: string;
}
