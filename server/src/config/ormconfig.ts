import { ConfigModule } from "@nestjs/config";
import dbConfig from "./db.config";

ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfig]
})

export default dbConfig()