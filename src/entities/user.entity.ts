import { Role } from '../enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Snippet } from 'src/entities/snippet.entity';
import { SharedProp } from './sharedProp.helper';

@Entity()
export class User extends SharedProp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: string;

    @OneToMany(() => Snippet, (snip) => snip.user)
    snippets: Snippet[]
}