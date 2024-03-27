import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { ExceptFilter } from './exception.filter';
import { LogController } from './log.controller';

@Module({
  providers: [LogService, ExceptFilter],
  exports: [LogService],
})
export class LogModule {}
