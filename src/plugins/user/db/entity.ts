import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';

import bcrypt from 'bcrypt';

import Post from '../../post/db/entity';

import Session from '../../session/db/entity';

enum UserRole {
    DISABLED = 'disabled',
    REGULAR = 'regular',
    MODERATOR = 'moderator',
    ADMIN = 'admin',
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    username: string;

    @Column({
        nullable: true,
        select: false, // userRepository.findOne({ where: { email }, select: ['id', 'password'] })
    })
    password: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
        unique: true,
        select: false,
    })
    social_id: string;

    @Column({
        nullable: false,
        default: 'local',
    })
    type: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: false,
        default: UserRole.REGULAR, // 0 = disabled, 1 = regular, 2 = moderator, 3 = administrator
    })
    privilege: UserRole;

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

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @OneToMany(type => Session, session => session.author)
    session: Session[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS));
    }

    /* @BeforeUpdate()
    updateHashPassword() {
        this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_ROUNDS));
    } */

}