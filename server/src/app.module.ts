import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
@Module({
  imports: [UsersModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory(config: ConfigService){
      return config.get('database')
    }
  })],
})
export class AppModule {}
