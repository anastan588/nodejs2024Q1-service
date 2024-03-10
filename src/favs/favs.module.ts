import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [DatabaseModule],
})
export class FavsModule {}
