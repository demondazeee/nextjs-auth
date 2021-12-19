import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory(config: ConfigService){
      return config.get('jwt_key')
    }
  }), TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
