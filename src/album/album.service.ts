import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from 'src/database/database.types';
import { NewAlbumParametr, UpdateAlbumParametr } from './dto/album.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }
  async getAlbumByID(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }
  async createAlbum(createAlBum: NewAlbumParametr): Promise<Album> {
    const newAlbum: Album = {
      id: v4(),
      year: createAlBum.year,
      name: createAlBum.name,
      artistId: createAlBum.artistId ? createAlBum.artistId : null,
    };
    await this.prisma.album.create({ data: newAlbum });
    return newAlbum;
  }
  async deleteAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.album.delete({ where: { id: id } });
    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: {
        artistId: null,
      },
    });
    // this.database.tracks.forEach((album) => {
    //   if (album.albumId === id) {
    //     album.albumId = null;
    //   }
    // });
    // const favAlbumId = this.database.favorites.albums.findIndex(
    //   (album) => album.id === id,
    // );
    // if (favAlbumId !== -1) {
    //   this.database.favorites.albums.splice(favAlbumId, 1);
    // }

    return album.id;
  }
  async updateAlbum(
    id: string,
    updateAlbum: UpdateAlbumParametr,
  ): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.album.update({
      data: {
        name: updateAlbum.name,
        year: updateAlbum.year,
        artistId: updateAlbum.artistId ? updateAlbum.artistId : null,
      },
      where: { id: id },
    });
    return await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
  }
}
