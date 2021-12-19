import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { NextFunction } from "express";
import { map } from "rxjs";
import { Users } from "src/users/entity/Users";

export class UserInfoInterceptor implements NestInterceptor{
    intercept(ctx: ExecutionContext, next: CallHandler){
        return next.handle().pipe(map(v => plainToInstance(Users, v)))
    }
}