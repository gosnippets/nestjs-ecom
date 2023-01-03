import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { SnippetStatus } from 'src/enums/snippetStatus.enum';
import { Unique } from 'typeorm';

@Unique(['slug'])
export class CreateSnippetDto {
    @IsNotEmpty({ message: 'Name is required' })
    title: string;

    slug: string;
    description: string;
    image:string;
    htmlcode: string;
    csscode: string;
    jscode: string;

    @IsNotEmpty({ message: 'Tags is required' })
    tags: string;
    csscdnOption:string;
    jquerycdnOption:string;
    fontscdnOption:string;

    @IsEnum(SnippetStatus)
    status: string;
}
