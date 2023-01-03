import { SnippetStatus } from 'src/enums/snippetStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Snippet {
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}