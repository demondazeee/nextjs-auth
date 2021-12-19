import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { UsersRepository } from 'src/users/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepo: UsersRepository,
        private jwtService: JwtService
    ){}


    async createUser(authDto: AuthCredentialsDto, res: Response){
        const user = await this.userRepo.createUser(authDto)
        const token = await this.jwt(res, user._id)

        return {
            ...user,
            token
        }
    }

    async loginUser(authDto: AuthCredentialsDto, res: Response){
        
        const {username, password} = authDto
        const user =  await this.userRepo.getUser(username)

        if(!user){
            throw new UnauthorizedException('Invalid Username')
        }

        if(!(await argon.verify(user.password, password))){
            throw new UnauthorizedException('Invalid Password')
        }

        const token = await this.jwt(res, user._id)
        
        return {
            ...user,
            token
        }
    }

    async logoutUser(res: Response){
        res.cookie('rt', '', {
            expires: new Date(0),
            httpOnly: true
        })
    }

    async refreshToken(req: Request, res: Response){
        try{
            const oldToken = req.cookies['rt']

            const decoded = await this.jwtService.verifyAsync(oldToken)

            if(!decoded){
                throw new Error('Invalid Token')
            }

            const user = await this.userRepo.getUserById(decoded._id)

            if(!user){
                throw new Error('Invalid User')
            }

            const token = await this.jwt(res, user._id)

            return {
                ...user,
                token
            }
        } catch(e){
            throw new UnauthorizedException(e)
        }
    }


    async jwt(res: Response, _id: string): Promise<string>{
        const payload: JwtPayload = {_id}

        const accessToken = await this.jwtService.signAsync(payload, {expiresIn: '15m'})
        const refreshToken = await this.jwtService.signAsync(payload)

        res.cookie('rt', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })
        
        return accessToken
    }
}
