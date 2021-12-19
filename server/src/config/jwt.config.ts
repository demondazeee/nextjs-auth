import {registerAs} from '@nestjs/config'


export default registerAs('jwt_key', () => ({
    secret: process.env.JWT_KEY
}))