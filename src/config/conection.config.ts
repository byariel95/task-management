import  { TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: parseInt(config.get<string>('DATABASE_PORT'),10),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,

    })
}