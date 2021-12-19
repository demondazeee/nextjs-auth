import { Body, Controller, Get, HttpCode, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserInfoInterceptor } from 'src/interceptors/user-info.interceptors';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@UseInterceptors(UserInfoInterceptor)
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/create')
    @HttpCode(201)
    async createUser(@Body() auth: AuthCredentialsDto, @Res({passthrough: true}) res: Response){
        return await this.authService.createUser(auth, res)
    }

    @Post('/login')
    @HttpCode(200)
    async loginUser(@Body() auth: AuthCredentialsDto, @Req() req: Request, @Res({passthrough: true}) res: Response){
        return await this.authService.loginUser(auth, res)

    }

    @Post('/logout')
    @HttpCode(200)
    async logoutUser(@Req() req: Request, @Res({passthrough: true}) res: Response){
        const user = await this.authService.logoutUser(res)
        return user
    }

    @Get('/refresh-token')
    @HttpCode(200)
    async refreshToken(@Req() req: Request, @Res({passthrough: true}) res: Response){
        return await this.authService.refreshToken(req, res)
    }
}
