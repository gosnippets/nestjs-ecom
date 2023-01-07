import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export class SharedProp {  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
}