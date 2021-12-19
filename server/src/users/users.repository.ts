import { InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { EntityRepository, Repository } from "typeorm";
import { Users } from "./entity/Users";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users>{
    async createUser(authDto: AuthCredentialsDto): Promise<Users>{
        const {username, password} = authDto

        const newUser = this.create({
            username,
            password
        })

        try{
            const user = await this.save(newUser)
            return user
        } catch(e){
            throw new InternalServerErrorException(e)
        }
    }

    async getUser(username: string): Promise<Users>{
        const user = await this.findOne({username})
        
        if(!user){
            return null
        }

        return user
    }

    async getUserById(_id: string): Promise<Users>{
        const user = await this.findOne({_id})
        
        if(!user){
            return null
        }

        return user
    }
}