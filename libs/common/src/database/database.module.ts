import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

// IMPORT THE DATABASE MODULE WITH OPTIONS
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({// useFactory allows to inject any number of arguments
                uri: configService.get('MONGO_URI')
            }),
            inject: [ConfigService]
        })]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models)
    }
}