import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from 'src/database/database.types';
import { NewAtristParametr, UpdateAtristParametr } from './dto/artist.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }
  async getArtistByID(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }
  async createArtist(createArtist: NewAtristParametr): Promise<Artist> {
    const newArtist: Artist = {
      id: v4(),
      grammy: createArtist.grammy,
      name: createArtist.name,
    };
    await this.prisma.artist.create({ data: newArtist });
    return newArtist;
  }
  async deleteArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.artist.delete({ where: { id: id } });
    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: {
        artistId: null,
      },
    });
    await this.prisma.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
    // const favArtistId = this.database.favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );
    // if (favArtistId !== -1) {
    //   this.database.favorites.artists.splice(favArtistId, 1);
    // }
    return artist.id;
  }
  async updateArtist(
    id: string,
    updateArtist: UpdateAtristParametr,
  ): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.artist.update({
      data: {
        name: updateArtist.name,
        grammy: updateArtist.grammy,
      },
      where: { id: id },
    });
    return artist;
  }
}
