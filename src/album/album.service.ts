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
    await this.prisma.track.updateMany({
      where: {
        albumId: id,
      },
      data: {
        albumId: null,
      },
    });
    const favAlbums = await this.prisma.favorite.findFirst({
      select: {
        albums: true,
      },
    });
    const albumID = favAlbums.albums.findIndex((album) => album === id);
    if (albumID !== -1) {
      favAlbums.albums.splice(albumID, 1);
      await this.prisma.favorite.update({
        where: { id: 1 },
        data: {
          tracks: {
            set: [...favAlbums.albums],
          },
        },
      });
    }
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
