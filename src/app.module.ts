import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { typeOrmConfigAsync } from './config/conection.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TasksModule,
    AuthModule],
  controllers: [AppController],
})
export class AppModule {}
