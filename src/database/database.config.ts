import { registerAs } from '@nestjs/config';

export type DatabaseConfig = {
    uri?: string;
    dbName?: string;
}

export default registerAs<DatabaseConfig>('database', () => ({
    uri: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME,
}))