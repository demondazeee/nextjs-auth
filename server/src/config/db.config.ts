import {registerAs} from '@nestjs/config'


export default registerAs('database', () => ({
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: ['dist/**/entity/*.js']
}))