import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from '../../user/db/entity';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    parent: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    type: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;

    @ManyToOne(type => User, user => user.posts)
    author: User;
}