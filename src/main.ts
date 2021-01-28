import { NestFactory } from '@nestjs/core';
import { Logger} from '@nestjs/common'
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger('bootstrap')
  await app.listen(port);
  logger.log(`Aplication runs on port ${await app.getUrl()}`)
}
bootstrap();
