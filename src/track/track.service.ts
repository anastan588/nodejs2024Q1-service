import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Track } from 'src/database/database.types';
import { NewTrackParametr, UpdateTrackParametr } from './dto/track.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackByID(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async createTrack(createTrack: NewTrackParametr): Promise<Track> {
    const newTrack: Track = {
      id: v4(),
      albumId: createTrack.albumId ? createTrack.albumId : null,
      artistId: createTrack.artistId ? createTrack.artistId : null,
      duration: createTrack.duration,
      name: createTrack.name,
    };
    await this.prisma.track.create({ data: newTrack });
    return newTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.delete({ where: { id: id } });
    // const favTrackId = this.database.favorites.tracks.findIndex(
    //   (track) => track.id === id,
    // );
    // if (favTrackId !== -1) {
    //   this.database.favorites.tracks.splice(favTrackId, 1);
    // }
    return track.id;
  }

  async updateTrack(
    id: string,
    updateTrack: UpdateTrackParametr,
  ): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.update({
      data: {
        albumId: updateTrack.albumId ? updateTrack.albumId : null,
        artistId: updateTrack.artistId ? updateTrack.artistId : null,
        duration: updateTrack.duration,
        name: updateTrack.name,
      },
      where: { id: id },
    });
    return await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
  }
}
