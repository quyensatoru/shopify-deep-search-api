import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config'
import {AllConfig} from "../config/config.type";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<AllConfig>) => ({
                uri: configService.get('database.uri', { infer: true }),
            })
        }),
    ]
})
export class DatabaseModule {}
