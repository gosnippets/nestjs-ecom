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
    htmlcode: string;

    @Column({ nullable: true })
    csscode: string;

    @Column({ nullable: true })
    jscode: string;
    
    @Column({ nullable: false })
    tags: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}