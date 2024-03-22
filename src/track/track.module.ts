import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [PrismaModule],
})
export class TrackModule {}
