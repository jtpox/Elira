import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate, OneToOne, ManyToOne } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';

import User from '../../user/db/entity';

@Entity()
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        default: '',
        
    })
    session_id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    token: string;

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

    /* @OneToOne(type => User, user => user.session)
    author: number; */

    @ManyToOne(type => User, user => user.session)
    author: number;

    @BeforeInsert()
    @BeforeUpdate()
    async hasToken() {
        this.token = await bcrypt.hash(this.token, Number(process.env.SALT_ROUNDS));
    }

    @BeforeInsert()
    async generateSessionId() {
        this.session_id = uuidv4();
    }
}