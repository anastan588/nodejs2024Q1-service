import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [DatabaseModule],
})
export class TrackModule {}
