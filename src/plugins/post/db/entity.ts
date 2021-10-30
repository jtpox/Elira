import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

import { validateOrReject } from 'class-validator';

import User from '../../user/db/entity';

import { validateJSON } from '../functions';

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
        nullable: false,
        default: 0,
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
    author: number;

    @BeforeInsert()
    @BeforeUpdate()
    checkJSON() {
        if (!validateJSON(this.content)) {
            this.content = JSON.stringify({
                content: this.content,
            });
        }
        // await validateOrReject(validateJSONPromise(this.content));
        
    }

    @AfterLoad()
    parseJSON() {
        this.content = JSON.parse(this.content);
    }
}