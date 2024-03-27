import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { LogService } from './log/log.service';
import { ExceptFilter } from './log/exception.filter';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const login = app.get(LogService);
  app.useLogger(login);
  process.on('uncaughtException', (error: Error) => {
    const message = `Caught Exception: ${error}`;
    login.error(message);
  });
  app.useGlobalFilters(new ExceptFilter(login));
  const docLink = path.resolve(__dirname, '../doc/api.yaml');
  const doc = await fs.readFile(docLink, 'utf8');
  SwaggerModule.setup('doc', app, load(doc) as OpenAPIObject);
  await app.listen(PORT);
}
bootstrap();
