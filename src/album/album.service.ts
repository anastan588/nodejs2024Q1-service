import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Album } from 'src/database/database.types';
import { NewAlbumParametr, UpdateAlbumParametr } from './dto/album.dto';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}
  getAllAlbums() {
    return this.database.albums;
  }
  getAlbumByID(id: string): Album {
    const album = this.database.albums.find((album) => album.id === id);
    return album;
  }
  createAlbum(createAlBum: NewAlbumParametr): Album {
    const newAlbum: Album = {
      id: v4(),
      year: createAlBum.year,
      name: createAlBum.name,
      artistId: createAlBum.artistId ? createAlBum.artistId : null,
    };
    this.database.albums.push(newAlbum);
    return newAlbum;
  }
  deleteAlbum(id: string) {
    const albumID = this.database.albums.findIndex((album) => album.id === id);
    this.database.albums.splice(albumID, 1);
    this.database.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    return albumID;
  }
  updateAlbum(id: string, updateAlbum: UpdateAlbumParametr): Album {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId ? updateAlbum.artistId : null;
    return album;
  }
}
