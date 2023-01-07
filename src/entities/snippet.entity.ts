import { SnippetStatus } from 'src/enums/snippetStatus.enum';
import { User } from 'src/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SharedProp } from './sharedProp.helper';

@Entity()
export class Snippet extends SharedProp{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    slug: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ type: "longtext", nullable: true })
    htmlcode: string;
 
    @Column({ type: "longtext", nullable: true })
    csscode: string;
 
    @Column({ type: "longtext", nullable: true })
    jscode: string;
    
    @Column({ nullable: false })
    tags: string;
    
    @Column({ nullable: false })
    csscdnOption: string;
    
    @Column({ nullable: false })
    jquerycdnOption: string;
    
    @Column({ nullable: false })
    fontscdnOption: string;

    @Column({ type: 'enum', enum: SnippetStatus, default: SnippetStatus.DRAFT })
    status: string;

    @ManyToOne(() => User, (user) => user.snippets)
    @JoinColumn({ name: 'userId' })
    user: User
}