import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as crypto from 'crypto'
import * as argon from 'argon2'
import { Exclude } from "class-transformer";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    username: string

    @Column()
    @Exclude()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hash(){
        const salt = crypto.randomBytes(128)
        this.password = await argon.hash(this.password, {salt})
    }
}