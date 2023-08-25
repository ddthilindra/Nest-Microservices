import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

// IMPORT THE DATABASE MODULE WITH OPTIONS
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({// useFactory allows to inject any number of arguments
                uri: configService.get('MONGO_URI')
            }),
            inject: [ConfigService]
        })]
})
export class DatabaseModule { }
