import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [PrismaModule],
})
export class FavsModule {}
